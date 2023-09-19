import { TArticle } from "../types";
import React from "react";

type Props = {
  handleCardClick: (url: string) => void;
  article: TArticle;
};

const SingleArticle: React.FC<Props> = ({ article, handleCardClick }) => {
  /* add modal when error state is true */
  const [error, setErrorr] = React.useState<boolean>(false);
  const handleError = () => {
    setErrorr(true);
  };
  const handleLoad = () => {
    setErrorr(false);
  };
  const date = new Date(article?.publishedAt).toDateString();
  return (
    <>
      {
        <article
          key={article.source.name ? article.source.name.trim() : "sdf"}
          onClick={() => handleCardClick(article.url)}
          className="md:w-[80vw] bg-white w-full min-h-[140px] cursor-pointer rounded-x-xl overflow-hidden justify-between shadow-2xl flex rounded-lg h-fit"
        >
          <section
            className={`justify-center min-w-[200px] w-[400px] md:w-[200px] items-center flex`}
          >
            <img
              className="object-cover h-full mx-auto text-center w-fit"
              src={article.urlToImage}
              loading="lazy"
              alt={article.author}
              onError={handleError}
              onLoad={handleLoad}
            />
          </section>
          <section className="flex flex-col justify-between pt-4 pb-4 pl-6 pr-4 lg:pl-4">
            <p className="lg:line-clamp-none font-roboto-600 line-clamp-3 overflow-ellipses max-h-[94px] text-start text-2xl">
              {article.title}
            </p>
            <div className="flex flex-col md:flex-row gap-y-1 md:justify-between md:gap-x-1">
              <span className="md:block text-slate-700">
                <span className="text-slate-800">
                  {article.author ? "by " : "unknown"}
                </span>
                {article?.author}
              </span>
              <span className="text-sm md:block text-slate-500">{date}</span>
            </div>
          </section>
        </article>
      }
    </>
  );
};

export default SingleArticle;
