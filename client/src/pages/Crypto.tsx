import React, { useEffect } from "react";
import { TCoin } from "../types";
import SingleCoin from "../components/SingleCoin";
import { fetchCoins } from "../api/external";
import Spinner from "../components/Spinner";

const Crypto = () => {
  const [coins, setCoins] = React.useState<TCoin[]>([]);
  const [error, setError] = React.useState<string>(undefined);
  const [loading, setLoading] = React.useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchCoins();
      if (res.status === 200) {
        setCoins(res.data);
        setLoading(false);
      } else {
        setError(res.statusText);
        setLoading(false);
      }
    })();
    // cleanup
    setCoins([]);
  }, []);

  return (
    <div className="min-h-screen pt-2 overflow-x-scroll md:overflow-auto bg-blue-950">
      {coins.length === 0 ? (
        <pre className="absolute scale-[200%] left-[50%] top-[50%]">
          <Spinner />
        </pre>
      ) : (
        <table className="container mx-auto border border-collapse border-indigo-900 table-auto">
          <thead key={"thead_1"} className="table-header-group">
            <tr key={"thead_tr_1"} className="table-row text-2xl text-slate-50">
              <th
                key={"thead_tr_th_1"}
                className="table-cell px-3 py-2 border border-indigo-900"
              >
                #
              </th>
              <th
                key="thead_tr_th_2"
                className="table-cell px-3 py-2 border border-indigo-900"
              >
                Coin
              </th>
              <th
                key="thead_tr_th_3"
                className="table-cell px-3 py-2 border border-indigo-900"
              >
                Symbol
              </th>
              <th
                key="thead_tr_th_4"
                className="table-cell px-3 py-2 border border-indigo-900"
              >
                Price
              </th>
              <th
                key="thead_tr_th_5"
                className="table-cell px-3 py-2 border border-indigo-900"
              >
                24h
              </th>
            </tr>
          </thead>
          <tbody className="table-footer-group">
            {!error ? (
              coins?.map((coin: TCoin, index: number) => (
                <SingleCoin index={index} key={coin.id} coin={coin} />
              ))
            ) : (
              <pre>{error}</pre>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Crypto;
