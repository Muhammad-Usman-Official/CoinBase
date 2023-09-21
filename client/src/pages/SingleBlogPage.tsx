import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteBlog,
  fetchBLogById,
  fetchComments,
  refreshUser,
} from "../api/internal";
import { TBlog, TComment, TLoginUser, TPostComment, TUser } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loader from "../components/Loader";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { resetUser, setUser } from "../store/userSlice";
import { AxiosError, AxiosResponse } from "axios";

const SingleBlogPage = () => {
  /* TODO: fix the refreshUserState function */
  const [blog, setBlog] = useState<TBlog>();
  const [comments, setComments] = useState<TComment[]>();
  const [ownsBlog, setOwnsBlog] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [reRender, setReRender] = useState<boolean>(false);

  const auth = useAppSelector((state) => state.user.auth);
  const { blogId } = useParams();
  const author = useAppSelector((state) => state.user._id);
  const authorUserName = useAppSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const refreshUserState = async (auth: boolean) => {
    if (!auth) {
      setLoading(true);
      refreshUser()
        .then((res: AxiosResponse) => {
          const data = res.data;
          dispatch(setUser(data));
          setLoading(false);
        })
        .catch((err: AxiosError) => {
          console.log("Error ", err.message);
        });
    }
  };

  const handleDeleteBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmation = confirm("You are going to delete the blog!");
    if (confirmation) {
      setLoading(true);
      if (!blogId) return;

      deleteBlog(blogId)
        .then((response: AxiosResponse) => {
          setSuccessMessage(response.data.message);
          navigate("/blogs");
        })
        .catch((err: AxiosError) => {
          if (err.status) setError(err.message);
        });
      setLoading(false);
    }
    setReRender(!reRender);
    return;
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/blog/update/${blog!._id}`);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      refreshUserState(auth);

      if (!blogId) {
        setLoading(false);
        return;
      }

      const blogRes = await fetchBLogById(blogId);
      const commentRes = await fetchComments(blogId);
      if (!auth) {
        dispatch(resetUser());
        refreshUser().then((res: AxiosResponse<TLoginUser>) => {
          setLoading(true);
          const data = res.data;
          const user: TUser = {
            _id: data.user._id,
            email: data.user.email,
            username: data.user.username,
            auth: data.auth,
          };
          dispatch(setUser(user));
          setLoading(false);
        });
      }
      if (blogRes.status !== 200 || commentRes.status !== 200) {
        setSuccessMessage("");
        setError(blogRes?.message);
        setError(commentRes?.message);
        setLoading(false);
      }

      setOwnsBlog(blogRes.data.blog.authorUserName === authorUserName);
      setBlog(blogRes?.data?.blog);
      setLoading(false);
      setComments(commentRes?.data?.comments);
    })();
  }, [reRender]);

  const handleCommentPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: TPostComment = {
      content: commentInput,
      author: author,
      blog: blogId!,
    };
    const response = await createComment(data);
    setSuccessMessage(response.data.message);
    setCommentInput("");
    setReRender(!reRender);
  };

  const handleCommentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.currentTarget.value);
  };

  return (
    <>
      {!blog || loading ? (
        <Loader text="Loading..." absolute={true} />
      ) : (
        <div className="min-h-screen text-indigo-100 bg-slate-950">
          <article className="container w-full min-h-screen pb-3 mx-auto space-y-8">
            <section className="">
              <section className="flex justify-center">
                <a
                  target="_blank"
                  className="overflow-hidden w-fit rounded-b-xl"
                  href={blog?.photo}
                >
                  <img
                    src={blog?.photo}
                    className="max-h-[500px] object-contain"
                    alt={blog?.authorUserName}
                  />
                </a>
              </section>
              <section className="pt-3 rounded-xl px-7 pb-7 bg-slate-900/40 mt-7">
                <div className="flex items-center justify-between">
                  <h1 className="pt-3 text-5xl font-semibold text-indigo-200">
                    {blog?.title}
                  </h1>
                  {ownsBlog ? (
                    <div className="flex text-xl gap-x-3">
                      <form
                        action=""
                        onSubmit={handleDeleteBlog}
                        method="delete"
                      >
                        <button
                          data-tooltip="Deletes this blog"
                          className="p-1 transition-all ease-in bg-transparent rounded-md data-[tooltip=Deletes this blog]:p-10:bg-white h-fit hover:bg-red-700 hover:outline-offset-2 focus:outline-offset-0 outline outline-red-700"
                        >
                          <AiOutlineDelete />
                        </button>
                      </form>

                      <form action="" onSubmit={handleEditBlog} method="put">
                        <button className="p-1 transition-all ease-in bg-transparent rounded-md h-fit hover:bg-orange-700 hover:outline-offset-2 focus:outline-offset-0 outline outline-orange-700">
                          <AiOutlineEdit />
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between pt-4 text-slate-400">
                  <span className="block">by {blog?.authorName}</span>
                  <span>{new Date(blog?.createdAt).toDateString()}</span>
                </div>
                <p className="pt-10 text-xl text-slate-50">{blog?.content}</p>
              </section>
            </section>
            <section className="space-y-5">
              <h3 className="text-4xl">Have any queation?</h3>
              <form
                className="flex flex-col gap-3"
                action=""
                method="post"
                onSubmit={handleCommentPost}
              >
                <textarea
                  value={commentInput}
                  onChange={handleCommentChange}
                  placeholder="Type your comment..."
                  className={`w-full px-5 py-3 flex flex-col bg-slate-800/40 text-slate-100 rounded-md outline-none ring-slate-600 focus:ring`}
                  rows={5}
                />
                <button
                  className="self-end px-3 py-2 bg-blue-700 w-fit rounded-xl"
                  type="submit"
                >
                  Submit
                </button>
                {error ? <span>{error}</span> : null}
              </form>
            </section>
            <section className="space-y-5">
              <h3 className="text-4xl">Comments</h3>
              <ul className="flex flex-col-reverse gap-3 transition-all">
                {loading ? (
                  <div className="flex justify-center py-5">
                    <Loader text="Loading..." absolute={false} />
                  </div>
                ) : (
                  comments?.map((comment, index) => (
                    <li
                      className={`bg-slate-900/40 transition-all flex items-center text-lg text-indigo-200 overflow-hidden rounded-xl  min-h-[80px]`}
                      tabIndex={index}
                      key={`${comment._id}-${index}`}
                    >
                      <div className="w-full">
                        <p className="flex flex-col w-full px-8 py-2 text-white border-b text-md gap-y-1 border-slate-700/80">
                          <span>{comment?.authorUsername}</span>
                          <span className="text-xs text-slate-500">
                            {new Date(comment?.createdAt).toDateString()}
                          </span>
                        </p>
                        <p className="min-h-[50px] text-sm flex flex-col justify-center my-auto pt-1 pb-2 pl-8">
                          {comment?.content}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </article>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
