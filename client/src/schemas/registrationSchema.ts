import * as yup from "yup";
import { passwordErrorMessage, passwordPattern } from "../utils";

const registrationSchema = yup.object({
  name: yup.string().max(30).required("Name is required."),
  username: yup.string().min(5).max(30).required("username is required."),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required."),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, passwordErrorMessage)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required(),
});
export default registrationSchema;
