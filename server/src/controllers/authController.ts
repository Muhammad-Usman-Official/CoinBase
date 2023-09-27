import { User } from "../database/models/user";
import { TUser, TUserDto } from "../types";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import joi from "joi";
// DTO refers to Data Transfer Object
import userDTO from "../dto/user";
import JWTService from "../services/JWTService";
import RefreshToken from "../database/models/token";
import { JwtPayload } from "jsonwebtoken";
import { AsyncLocalStorage } from "async_hooks";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const authController = {
  // info: REGISTER Controller
  async register(req: Request, res: Response, next: NextFunction) {
    const userRegisterSchema = joi.object({
      username: joi.string().min(5).max(30).required(),
      name: joi.string().max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().pattern(passwordPattern).required(),
      confirmpassword: joi.ref("password"),
    });
    // 2. if error in validation => return error via a middleware
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, name, email, password } = req.body;
    email.toLowerCase();
    // 3. if email or username is already registered => return an error
    try {
      const emailExists = await User.exists({ email });
      const usernameExists = await User.exists({ username });
      if (emailExists) {
        const errorBody = {
          status: 409,
          message: "Email already registered, use another email!",
        };
        return next(errorBody);
      }

      if (usernameExists) {
        const error = {
          status: 409,
          message: "username is already taken, please use another username!",
        };
        res.status(error.status);
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    // 4. convert password according to hash algorithm
    const hashedPass = await bcrypt.hash(password, 10);
    // 5. store user data in database
    let accessToken: string,
      refreshToken: string,
      user: TUser,
      userDto: TUserDto;

    try {
      const userToRegister = new User({
        name,
        username,
        email,
        password: hashedPass,
      });
      user = await userToRegister.save();
      accessToken = JWTService.signAccessToken({ _id: user._id }, "2d");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "3d");
      userDto = new userDTO(user);
    } catch (err) {
      return next(err);
    }

    //store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
      httpOnly: true, // prevent XSS attacks
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 60 * 24 * 3,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(201).json({ user: userDto, auth: true });
  },
  // info: LOGIN Controller
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    // 1. validate email and paaword
    const userLoginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userLoginSchema.validate({ email, password });

    // 2. if error in validation -> throw error
    if (error) {
      const err = {
        status: 409,
        message: error,
      };
      next(err);
    }
    let user: TUser | null;
    try {
      user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({
          message: `Invalid email or password`,
        });
    } catch (err) {
      next(err);
    }

    // 3. match email and password
    const match = await bcrypt.compare(password, user!.password);
    if (!match) {
      res.status(404);
      return next({
        message: "Invalid password",
      });
    }
    // 4. return response\
    const accessToken = JWTService.signAccessToken({ _id: user!._id }, "2d");
    const refreshToken = JWTService.signRefreshToken({ _id: user!._id }, "3d");
    // update refresh token in database
    try {
      await RefreshToken.updateOne(
        {
          _id: user!._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (err) {
      return next(err);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      sameSite: "none",
    });
    JWTService.storeRefreshToken(refreshToken, user!._id);
    const userDto = new userDTO(user!);
    return res.status(200).json({ user: userDto, auth: true });
  },

  // info logout
  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (err) {
      next(err);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // Sending response
    res.status(200).json({
      user: null,
      auth: false,
    });
  },
  async refresh(req: Request, res: Response, next: NextFunction) {
    // get the refresh token
    const orignalRefreshToken = req.cookies.refreshToken;
    // verify the refresh token
    let id: JwtPayload;
    try {
      id = JWTService.verifyRefreshToken(orignalRefreshToken)._id;
    } catch (err) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      res.status(error.status);
      return next(error);
    }

    try {
      const matchFound = await RefreshToken.findOne({
        _id: id,
        token: orignalRefreshToken,
      });
      if (!matchFound) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };
        res.status(error.status);
        return next(error);
      }
    } catch (err) {
      return next(err);
    }
    // generate the refresh token
    let refreshToken;

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "2d");

      refreshToken = JWTService.signRefreshToken({ _id: id }, "3d");

      await RefreshToken.updateOne({ token: refreshToken }, { _id: id });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        sameSite: "none",
      });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "none",
      });
    } catch (err) {
      return next(err);
    }
    // return the response in the form of filtered user data using dto
    const user = await User.findOne({ _id: id });
    const userDto = new userDTO(user!);
    return res.status(200).json({ user: userDto, auth: true });
  },
};

export default authController;
