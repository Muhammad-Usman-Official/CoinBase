import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setDisabled(true);
    axios({
      url: "http://localhost:3000/login",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    }).then(() => {
      setSubmitted(true);
      setEmail("");
      setPassword("");
      navigate("/");
    });
  };
  useEffect(() => {
    setDisabled(false);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-[#4A707A]">
        <div className="pattern"></div>
        <div className="container flex items-center justify-center min-h-screen mx-auto">
          <div className="w-2/5 px-8 mx-auto border border-teal-40 bg-[#94B0B7]/40 backdrop-blur-sm py-7 rounded-xl ">
            <h1 className="pb-5 mx-auto text-3xl text-[#C2C8C5] w-fit">
              Login
            </h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center space-x-3 space-y-4 selection:bg-teal-300 h-ful"
              action=""
            >
              <div className="w-full space-y-2">
                <div className="flex flex-col self-start w-full mt-1 space-y-2 text-gray-800">
                  <label className="text-[#DDDDDA]" htmlFor="userEmail">
                    Email Address
                  </label>
                  <input
                    placeholder="e.g. user@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                    className="px-2 py-1 text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring"
                    id="userEmail"
                    type="email"
                  />
                </div>
                <div className="flex flex-col self-start w-full mt-1 space-y-2 text-gray-800">
                  <label className="text-[#DDDDDA]" htmlFor="userPassword">
                    Password
                  </label>
                  <input
                    placeholder="e.g. YourPass1284($&@^"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                    className="px-2 py-1 text-gray-800 rounded-md outline-none ring-emerald-300 focus:ring"
                    id="userPassword"
                    type="password"
                  />
                </div>
              </div>
              <button
                disabled={disabled}
                className={`${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                } w-full flex outline-none border-none focus:ring-violet-500 justify-center transition-colors ease-out delay-100 cursor-pointer px-3 py-1.5 hover:bg-[#4f585c] ring-1 ring-slate-500 bg-[#94B0B7] text-white rounded-md`}
                type="submit"
              >
                Submit{" "}
                {submitted === false ? (
                  <span className="ml-5">
                    <Spinner />
                  </span>
                ) : null}
              </button>
              <span>
                Don't have an account?
                <Link
                  className="text-white active:opacit-80 hover:text-blue-300 "
                  to={"/signup"}
                >
                  {" "}
                  Sign Up
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
