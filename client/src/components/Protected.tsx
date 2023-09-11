import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
const Protected = ({ children }: { children: ReactElement }) => {
  const isAuth = useAppSelector((state) => state.user.auth);

  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
