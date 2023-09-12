import React, { useState, useEffect } from "react";
import SingleArticle from "./components/SingleArticle";
import { TArticle, TNewsApi } from "./types";
import { fetchNews } from "./api/external";
import Spinner from "./components/Spinner";

const App = () => {
  const [news, setNews] = useState<TNewsApi | undefined>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const articles: TArticle[] | undefined = news?.articles;
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchNews();
      if (res instanceof Error) {
        // handle error
        setLoading(null);
      } else {
        setNews(res);
        setLoading(null);
      }
    })();
  }, []);
  function handleCardClick(url: string) {
    window.open(url, "_blank");
  }
  return (
    <div className={"bg-white min-h-screen text-slate-900"}>
      <div className="container px-4 py-2 mx-auto">
        <h1 className="text-3xl text-center pt-3 pb-5">Latest Articles</h1>
        <section className="flex flex-wrap gap-2 ">
          {loading ? (
            <pre className="absolute scale-[200%] left-[50%] top-[50%]">
              <Spinner />
            </pre>
          ) : (
            articles?.map((article: TArticle) => (
              <SingleArticle
                article={article}
                handleCardClick={handleCardClick}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
