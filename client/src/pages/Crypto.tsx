import React, { useEffect } from "react";
import { TCoin } from "../types";
import SingleCoin from "../components/SingleCoin";
import { fetchCoins } from "../api/external";
import Spinner from "../components/Spinner";

const Crypto = () => {
  const [coins, setCoins] = React.useState<TCoin[]>([]);
  const [error, setError] = React.useState<any>(undefined);
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
  });

  return (
    <div className="bg-blue-950 min-h-screen pt-2">
      {coins.length === 0 ? (
        <pre className="absolute scale-[200%] left-[50%] top-[50%]">
          <Spinner />
        </pre>
      ) : (
        <table className="table-auto container mx-auto border border-indigo-900 border-collapse">
          <thead className="table-header-group">
            <tr className="table-row text-2xl text-slate-50">
              <th className="table-cell border border-indigo-900 px-3 py-2">
                #
              </th>
              <th className="table-cell border border-indigo-900 px-3 py-2">
                Coin
              </th>
              <th className="table-cell border border-indigo-900 px-3 py-2">
                Symbol
              </th>
              <th className="table-cell border border-indigo-900 px-3 py-2">
                Price
              </th>
              <th className="table-cell border border-indigo-900 px-3 py-2">
                24h
              </th>
            </tr>
          </thead>
          {!error ? (
            coins?.map((coin: TCoin, index: number) => (
              <tbody className="table-row-group">
                <SingleCoin index={index} key={coin.id} coin={coin} />
              </tbody>
            ))
          ) : (
            <pre>{error}</pre>
          )}
        </table>
      )}
    </div>
  );
};

export default Crypto;
