import { TCoin } from "../types";

const SingleCoin = ({ coin, index }: { coin: TCoin; index: number }) => {
  return (
    <tr
      id={coin.id}
      tabIndex={index}
      key={coin.id}
      className="table-row text-xl text-indigo-200"
    >
      <td className="table-cell py-2 pl-3 border border-indigo-900">
        {coin.market_cap_rank}
      </td>
      <td className="table-cell py-2 pl-3 border border-indigo-900">
        <div className="flex items-center min-w-[150px] gap-x-4 md:gap-x-5">
          <img
            className="object-contain w-6 md:w-8 aspect-square"
            src={coin.image}
            alt={coin.name}
          />
          <span className="block text-[17px] font-semibold md:text-xl">
            {coin.name}
          </span>
        </div>
      </td>
      <td className="table-cell py-2 pl-3 border border-indigo-900">
        {coin.symbol}
      </td>
      <td className="table-cell px-3 py-2 border border-indigo-900">
        ${coin.current_price}
      </td>
      <td
        className={`${
          coin.price_change_24h.toString().charAt(0) === "-"
            ? "text-red-600"
            : ""
        } border border-indigo-900 table-cell pl-3`}
      >
        {coin.price_change_24h}
      </td>
    </tr>
  );
};

export default SingleCoin;
