import { TArticle } from "../types";
import React from "react";

type Props = {
  handleCardClick: (url: string) => void;
  article: TArticle;
};

const SingleArticle: React.FC<Props> = ({ article, handleCardClick }) => {
  /* TODO: add modal when error state is true and show the error */
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
          className="md:w-[80vw] bg-white w-full min-h-[140px] cursor-pointer rounded-x-xl overflow-hidden gap-x-3 justify-start shadow-2xl flex rounded-lg h-fit"
        >
          <section
            className={`flex items-center justify-center max-w-[170px] max-lg:w-full`}
          >
            <img
              className="object-cover w-full h-full text-center"
              src={article.urlToImage}
              loading="lazy"
              alt={article.author}
              onError={handleError}
              onLoad={handleLoad}
            />
          </section>
          <section className="flex flex-col justify-between w-full pt-4 pb-4 pl-6 pr-4 lg:pl-4">
            <p className="lg:line-clamp-none font-roboto-600 line-clamp-3 overflow-ellipses max-h-[94px] text-start text-2xl">
              {article.title}
            </p>
            <div className="flex flex-col w-full md:flex-row gap-y-1 md:justify-between md:gap-x-1">
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
