import React from "react";
import TextInput from "../components/TextInput";
import { TState } from "../types";
import { useSelector } from "react-redux";
import { postBlog } from "../api/internal";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const SubmitBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState<{
    title: string;
    content: string;
    photo: string | ArrayBuffer | null;
  }>({
    title: "",
    content: "",
    photo: "",
  });
  const [loading, setLoading] = React.useState<null | boolean>(null);
  const [message, setMessage] = React.useState<null | string>();
  const [error, setError] = React.useState<string | null>();

  const author = useSelector((state: TState) => state.user._id);

  const handleError = () => {
    if (input.title === "" || input.content === "") {
      setError("Cannot post, either title or description is empty!");
      return;
    } else {
      setError(null);
    }
  };

  const handleBlogSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (input.title === "" || input.content === "") {
      setError("Cannot post either title or description is empty!");
      setLoading(false);
      return;
    }

    const data = {
      author: author,
      ...input,
    };

    const res = await postBlog(data);
    if (res.status === 200) {
      setMessage(res?.statusText);
    }

    setLoading(false);
    setInput({ title: "", content: "", photo: "" });
    if (res.data.message !== "jwt expired" && res.status === 200) {
      navigate("/blogs");
    }
  };

  const handleGetPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInput({
        ...input,
        photo: reader.result,
      });
    };
  };

  return (
    <article className="min-h-screen pb-3 text-indigo-200 bg-indigo-950">
      <form
        action=""
        onSubmit={handleBlogSumit}
        className="container flex flex-col items-center max-w-xl pt-3 pb-3 mx-auto gap-y-3"
      >
        {/* <input type="text" /> */}
        <section className="w-full py-2 mx-auto space-y-4">
          <label className="text-2xl" htmlFor="title">
            Blog Title
          </label>
          <TextInput
            translate="yes"
            onFocus={handleError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleError();
              setInput({
                ...input,
                title: e.currentTarget.value,
              });
            }}
            id="title"
            name="title"
            placeholder="Your blog title goes here"
            value={input.title}
            className={`lg:text-xl w-full ring-indigo-900 bg-indigo-950 text-white block px-3 py-2 rounded-md focus:ring ring-1 focus:ring-indigo-900`}
            type="text"
          />
        </section>
        <section className="w-full py-2 space-y-4">
          <label className="text-2xl" htmlFor="content">
            Blog Description
          </label>
          <textarea
            onFocus={handleError}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleError();
              setInput({
                ...input,
                content: e.currentTarget.value,
              });
            }}
            rows={5}
            id="content"
            name="content"
            placeholder="Your blog description goes here..."
            value={input.content}
            className={`lg:text-xl w-full ring-indigo-900 bg-indigo-950 text-white block px-3 py-2 rounded-md focus:ring ring-1 focus:ring-indigo-900`}
          />
        </section>
        <section className="w-full mx-auto">
          <label className="text-2xl" htmlFor="photo">
            Picture for blog
          </label>
          <input
            accept="image/jpg, image/jpeg, image/png"
            className="block w-full"
            onChange={handleGetPhoto}
            type="file"
          />
          {input.photo !== "" ? (
            <div className="w-full pt-2 pb-3 h-fit">
              <img
                alt=""
                className="object-contain"
                src={input.photo!.toString()}
              />
            </div>
          ) : null}
        </section>
        <button
          className="flex justify-center w-full max-w-xl px-3 py-1 transition-colors rounded-lg gap-x-3 ring ring-indigo-900 hover:bg-indigo-900 bg-indigo-950"
          type="submit"
        >
          <span>Post Blog</span> {loading ? <Spinner /> : null}
        </button>
        {error || message ? (
          <span className={`${error ? "text-red-600" : "text-blue-500"}`}>
            {error ? error : message}
          </span>
        ) : null}
      </form>
    </article>
  );
};

export default SubmitBlog;
