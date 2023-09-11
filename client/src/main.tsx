import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import "./index.css";
import Crypto from "./pages/Crypto.tsx";
import Blogs from "./pages/Blogs.tsx";
import SubmitBlog from "./pages/SubmitBlog.tsx";
import Error from "./pages/Error.tsx";
import Navbar from "./components/Navbar.tsx";
import Protected from "./components/Protected.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { useAppSelector } from "./hooks/hooks.ts";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/crypto",
        element: <Crypto />,
      },
      {
        path: "/blogs",
        element: (
          <Protected>
            <Blogs />
          </Protected>
        ),
      },
      {
        path: "/submit",
        element: (
          <Protected>
            <SubmitBlog />
          </Protected>
        ),
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Register />,
    path: "/register",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
