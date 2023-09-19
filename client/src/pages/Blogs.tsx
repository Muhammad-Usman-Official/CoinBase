import React, { useEffect } from "react";
import { TBlog } from "../types";
import { fetchBlogs, refreshUser } from "../api/internal";
import SingleBlog from "../components/SingleBlog";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { resetUser } from "../store/userSlice";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState<TBlog[]>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<null | boolean>(null);

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.user.auth);
  console.log(auth);
  if (!auth) {
    refreshUser().catch((err) => {
      console.log(err);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resetUserState = async (res: any) => {
    if (res.response.status === 401) {
      dispatch(resetUser());
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!auth) {
        refreshUser().catch((err) => {
          console.log(err);
          setLoading(false);
        });
      }

      const res = await fetchBlogs();
      if (res.data.message === "jwt expired") {
        dispatch(resetUser());
      }
      if (res.status === 200) {
        setBlogs(res.data);
        setLoading(false);
      } else {
        resetUserState(res);
        setError(res.config.data.message);
        setLoading(false);
      }
    })();
  }, []);
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
            <pre className="absolute scale-[200%] left-[50%] top-[50%]">
              <Spinner />
            </pre>
          ) : (
            blogs?.map((blog: TBlog, index: number) => (
              <SingleBlog key={blog._id} index={index} blog={blog} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
