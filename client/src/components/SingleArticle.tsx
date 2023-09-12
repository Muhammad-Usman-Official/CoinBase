import { TArticle } from "../types";
import React from "react";

type Props = {
  handleCardClick: (url: string) => void;
  article: TArticle;
};

const SingleArticle: React.FC<Props> = ({ article, handleCardClick }) => {
  console.log(article.source.id);
  return (
    <article
      key={article.source.name ? article.source.name.trim() : "sdf"}
      onClick={() => handleCardClick(article.url)}
      className="w-72 lg:w-[80vw] cursor-pointer mx-auto border rounded-t-xl overflow-hidden shadow-lg bg-violet-100 flex lg:flex-row flex-col justify-between rounded-lg h-fit"
    >
      <img
        className="object-contain text-center lg:w-60 lg:max-h-60 lg:min-h-[100px] w-full mix-blend-multiply"
        src={article.urlToImage}
        loading="lazy"
        alt={article.author}
      />
      <caption className="lg:line-clamp-none line-clamp-3 overflow-ellipses h-[94px] text-start lg:pl-4 pt-4 px-4 pb-4 lg:text-xl">
        {article.title}
      </caption>
    </article>
  );
};

export default SingleArticle;
