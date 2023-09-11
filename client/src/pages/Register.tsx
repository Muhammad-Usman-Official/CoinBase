import { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import registrationSchema from "../schemas/registrationSchema";
import { register } from "../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Register = () => {
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);

    const registerCredentials = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    await register(registerCredentials)
      .then((res: any) => {
        const user = res.data.user;
        const status = res.config.status;
        setSubmitted(true);
        values.email = "";
        values.username = "";
        values.name = "";
        values.password = "";
        values.confirmPassword = "";
        if (status === 201) {
          dispatch(setUser(user));
        }
        navigate("/login");
      })
      .catch((err) => {
        return console.log(err.message);
      });
  };

  const emailErrorCondition = errors.email && touched.email ? 1 : undefined;
  const passwordErrorCondition =
    errors.password && touched.password ? 1 : undefined;
  const usernameErrorCondition =
    errors.username && touched.username ? 1 : undefined;
  const nameErrorCondition = errors.name && touched.name ? 1 : undefined;
  const confirmPasswordErrorCondition =
    errors.confirmPassword && touched.password ? 1 : undefined;
  return (
    <>
      <div className="min-h-screen bg-[#011e26]">
        <div className="container flex items-center justify-center min-h-screen mx-auto">
          <div className="lg:w-2/4 sm:w-[90vw] max-w-lg w-full px-8 mx-auto bg-[#0d4a56]/30 sm:scale-[0.90] shadow-xl shadow-[#0d4a56]/40 py-7 rounded-xl ">
            <h1 className="pb-5 mx-auto text-3xl text-[#C2C8C5] w-fit">
              Sign up
            </h1>
            <form
              onSubmit={handlRegister}
              className="flex flex-col items-center space-x-3 space-y-4 selection:bg-teal-300 h-ful"
              action=""
            >
              <div className="flex-col flex gap-x-2 w-full lg:flex-row text-[#DDDDDA]">
                <div className="flex flex-col w-full mt-1 space-y-2 lg:w-1/2">
                  <label className="text-xl text-[#DDDDDA]" htmlFor="firstName">
                    Your Name
                  </label>
                  <TextInput
                    error={nameErrorCondition}
                    name="name"
                    placeholder="e.g. Muhammad Usman"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errormessage={errors.name}
                    className={`${
                      errors.name
                        ? "ring-red-700 ring"
                        : "ring-emerald-300 focus:ring"
                    } px-2 w-full py-1 text-lg text-gray-800 rounded-md  outline-none ring-emerald-300 focus:ring`}
                    id="firstName"
                    type="text"
                  />
                </div>
                <div className="flex flex-col w-full mt-1 space-y-2 lg:w-1/2">
                  <label className="text-xl text-[#DDDDDA]" htmlFor="username">
                    Username
                  </label>
                  <TextInput
                    error={usernameErrorCondition}
                    name="username"
                    placeholder="e.g. usman_12"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errormessage={errors.username}
                    className={`${
                      errors.username
                        ? "ring-red-700 ring"
                        : "ring-emerald-300 focus:ring"
                    } px-2 w-full py-1 text-lg text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring`}
                    id="username"
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex flex-col w-full mt-1 space-y-2 text-gray-800">
                  <label className="text-xl text-[#DDDDDA]" htmlFor="userEmail">
                    Email Address
                  </label>
                  <TextInput
                    error={emailErrorCondition}
                    name="email"
                    placeholder="e.g. user@email.com"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errormessage={errors.email}
                    className={`${
                      errors.email
                        ? "ring-red-700 ring"
                        : "ring-emerald-300 focus:ring"
                    } px-2 py-1 text-lg text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring`}
                    id="userEmail"
                    type="email"
                  />
                </div>
                <div className="flex flex-col w-full mt-1 space-y-2 text-gray-800">
                  <label
                    className="text-xl text-[#DDDDDA]"
                    htmlFor="userPassword"
                  >
                    Password
                  </label>
                  <TextInput
                    error={passwordErrorCondition}
                    name="password"
                    placeholder="e.g. YourPass1284($&@^"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errormessage={errors.password}
                    className={`${
                      errors.password
                        ? "ring-red-700 ring"
                        : "ring-emerald-300 focus:ring"
                    } px-2 py-1 text-lg text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring`}
                    id="userPassword"
                    type="password"
                  />
                </div>
                <div className="flex flex-col w-full mt-1 space-y-2 text-gray-800">
                  <label
                    className="text-xl text-[#DDDDDA]"
                    htmlFor="confirmPassword"
                  >
                    Confirm password
                  </label>
                  <TextInput
                    error={confirmPasswordErrorCondition}
                    name="confirmPassword"
                    placeholder="Re enter your password..."
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    errormessage={errors.confirmPassword}
                    className={`${
                      errors.confirmPassword
                        ? "ring-red-700 ring"
                        : "ring-emerald-300 focus:ring"
                    } px-2 py-1 text-lg text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring`}
                    id="confirmPassword"
                    type="password"
                  />
                </div>
              </div>
              <button
                className={`${
                  errors.name ||
                  errors.email ||
                  errors.confirmPassword ||
                  errors.password ||
                  errors.username
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-emerald-900"
                } w-full flex justify-center transition-colors ease-out delay-100 px-3 py-1.5  border border-teal-500 text-white rounded-md`}
                type="submit"
              >
                Create an account{" "}
                {submitted === false ? (
                  <span className="ml-5">
                    <Spinner />
                  </span>
                ) : null}
              </button>
              <span className="text-slate-300">
                OR already have an account?{" "}
                <Link
                  className="ml-1 underline-offset-[5px] hover:text-indigo-200 text-slate-100 hover:underline"
                  to={"/login"}
                >
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
