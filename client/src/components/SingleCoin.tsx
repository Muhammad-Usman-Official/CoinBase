import { TCoin } from "../types";

const SingleCoin = ({ coin, index }: { coin: TCoin; index: number }) => {
  const serialNumber = index + 1;
  return (
    <tr className="table-row text-xl text-indigo-200">
      <td className="border border-indigo-900 table-cell py-2 pl-3">
        {serialNumber}
      </td>
      <td className="border border-indigo-900 table-cell py-2 pl-3">
        {coin.name}
      </td>
      <td className="border border-indigo-900 table-cell py-2 pl-3">
        {coin.symbol}
      </td>
      <td className="border border-indigo-900 table-cell py-2 pl-3">
        {coin.current_price}
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
