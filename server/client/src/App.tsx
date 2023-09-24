import { useState, useEffect } from "react";
import SingleNewsArticle from "./components/SingleNewsArticle";
import { TArticle, TNewsApi } from "./types";
import { fetchNews } from "./api/external";
import Loader from "./components/Loader";

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
      <div className="container px-4 pb-2 mx-auto">
        <h1 className="py-8 text-5xl font-bold text-center font-roboto-600">
          Latest Articles
        </h1>
        <section className="grid gap-5 place-items-center">
          {loading ? (
            <Loader absolute={true} text={"Loading..."} />
          ) : (
            articles?.map((article: TArticle, index: number) => (
              <SingleNewsArticle
                key={index}
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
