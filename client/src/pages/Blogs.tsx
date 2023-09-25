import React, { useEffect } from "react";
import { TBlog } from "../types";
import { fetchBlogs, refreshUser } from "../api/internal";
import SingleBlog from "../components/SingleBlog";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { resetUser, setUser } from "../store/userSlice";
import Loader from "../components/Loader";
import { AxiosError, AxiosResponse } from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState<TBlog[]>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<null | boolean>(null);
  const [reRender, setReRender] = React.useState<boolean>(false);

  console.log(blogs);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.user.auth);
  if (!auth) setReRender(!reRender);

  const resetUserState = () => {
    dispatch(resetUser());
    setReRender(!reRender);
  };

  const updateUserState = async () => {
    refreshUser()
      .then((res: AxiosResponse) => {
        setLoading(true);
        const data = res.data;
        const user = {
          auth: data.auth,
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
        };
        dispatch(setUser(user));
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        return err;
      });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!auth) {
        updateUserState();
      }

      fetchBlogs()
        .then((res: AxiosResponse) => {
          console.log(res);
          if (res.data.message === "jwt expired") {
            resetUserState();
            setLoading(false);
          } else {
            setBlogs(res.data);
            setLoading(false);
          }
        })
        .catch((err: AxiosError) => {
          setError(err.config?.data.message);
          if (err.status === 401 || err.response!.status === 401) {
            resetUserState();
            updateUserState();
            setLoading(false);
          }
        });
    })();
  }, [reRender, auth]);
  return (
    <div className="min-h-screen text-indigo-200 bg-slate-950">
      <div className="container pt-6 pb-10 mx-auto">
        <h1 className="text-5xl font-semibold text-center text-slate-100 mb-7">
          Blogs
        </h1>
        <div className="grid grid-flow-row gap-y-6">
          {error ? (
            <pre>{error}</pre>
          ) : loading ? (
            <Loader absolute={true} text="Loading..." />
          ) : blogs.length !== 0 ? (
            blogs?.map((blog: TBlog, index: number) => (
              <SingleBlog key={blog._id} index={index} blog={blog} />
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
