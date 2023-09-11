import * as yup from "yup";
import { passwordErrorMessage, passwordPattern } from "../utils";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required."),
  password: yup
    .string()
    .matches(passwordPattern, passwordErrorMessage)
    .min(8)
    .max(25)
    .required("Password is required"),
});
export default loginSchema;
