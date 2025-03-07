import React, { useEffect, useState } from "react";
import { ExchangeRate } from "../utility/types";
import apiClient from "../service";

interface ExchangeRateTableProps {
  handleOpenUpdate: (country: ExchangeRate | any) => void;
}

const getCountryFlagEmoji = (code: string): string => {
  const firstChar = code.charAt(0).toUpperCase().charCodeAt(0) - 65 + 127462;
  const secondChar = code.charAt(1).toUpperCase().charCodeAt(0) - 65 + 127462;
  return String.fromCodePoint(firstChar, secondChar);
};

const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({ handleOpenUpdate }) => {
  const [exchangeData, setExchangeData] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await apiClient.get("/payaza-exchange-rate");
        setExchangeData(response?.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  }

  return (
    <div className="max-w-[1200px] mx-2 md:mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full relative">
      <div className="flex border-b">
        <button className="w-1/2 py-6 text-gray-600 font-semibold">Currency Calculator</button>
        <button className="w-1/2 py-6 font-semibold border-b-2 border-gray-800 text-gray-800">Exchange Rate</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-6 px-4">Country Code</th>
            <th className="py-6 px-4">Buy</th>
            <th className="py-6 px-4">Sell</th>
          </tr>
        </thead>
        <tbody>
          {exchangeData.map((item) => (
            <tr
              onClick={() => handleOpenUpdate(item)}
              key={item._id}
              className="border-b hover:bg-[#f0f0f0]"
            >
              <td className="py-6 px-4 flex items-center space-x-2">
                <span>{getCountryFlagEmoji(item.countryCode)}</span>
                <span>{item.currency}</span>
              </td>
              <td className="py-6 px-4">{item.priceAgainstUSD}</td>
              <td className="py-6 px-4">{item.USDagainstPrice || item.priceAgainstUSD}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRateTable;