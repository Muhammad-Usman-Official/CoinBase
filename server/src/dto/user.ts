import { Types } from "mongoose";
import types from "../types";
class userDTO {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  constructor(user: types.TUserDto) {
    this._id = user._id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
  }
}

export default userDTO;
