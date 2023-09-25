import { TBlog } from "../types";
import { Link } from "react-router-dom";

const SingleBlog = ({ blog, index }: { blog: TBlog; index: number }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="mt-2 overflow-hidden border-b pb-7 border-slate-700"
      tabIndex={index}
    >
      <article className="flex flex-col lg:flex-row gap-x-4 gap-y-3">
        <section className="flex items-center justify-center max-lg:mx-auto max-w-[170px] max-lg:w-full aspect-square">
          <img
            src={`${blog?.photo}.png`}
            className="object-cover w-full aspect-square"
            alt={"Photo failed to load"}
          />
        </section>
        <section className="ml-6 max-lg:text-center lg:w-fit">
          <h2 className="text-3xl font-semibold text-slate-200 md:text-4xl lg:text-5xl">
            {blog?.title}
          </h2>
          <p className="text-[15px] mt-4 mb-2 line-clamp-4">{blog?.content}</p>
          <div>
            <span className="text-slate-500">
              {new Date(blog?.createdAt).toDateString()}
            </span>
          </div>
        </section>
      </article>
    </Link>
  );
};

export default SingleBlog;
