// src/components/PortfolioTable.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePortfolio } from "../context/PortfolioContext";

interface PortfolioItem {
  id: string;
  name: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  purchaseCost: number;
  investmentAmount: number;
  purchaseDate: Date | null;
  return: number;
  profitLoss: number;
}
const PortfolioTable = () => {

  const [dataTable, setDataTable] = useState<PortfolioItem[]>([]);
  const { cryptosInfo, cryptosInvestmentPortfolio, updateCryptosInvestmentPortfolio } = usePortfolio();
  
  useEffect(() => {    
    setDataTable(createDataTable(cryptosInvestmentPortfolio, cryptosInfo));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptosInvestmentPortfolio, cryptosInfo]);

  const createDataTable = (cryptosInvestmentPortfolio: any[], cryptosInfo: any[]): PortfolioItem[] => {
    const data: PortfolioItem[] = cryptosInvestmentPortfolio.map((item) => {
      const detailData = cryptosInfo.find(
        (crypto) => item.crypto?.id === crypto.id
      );
      
      return {
        id: item.crypto?.id || "",
        name: item.crypto?.name || "",
        currentPrice: detailData?.current_price || 0,
        priceChangePercentage24h: detailData?.current_price || 0,
        purchaseCost: parseFloat(item.averageCost),
        investmentAmount: parseFloat(item.investmentAmount),
        purchaseDate: item.purchaseDate,
        return: Number((Number(detailData?.current_price) - parseFloat(item.averageCost)) / parseFloat(item.averageCost)) * 100,
        profitLoss: Number((Number(detailData?.current_price) - parseFloat(item.averageCost)) * (parseFloat(item.investmentAmount)/parseFloat(item.averageCost)))
      };
    });
    return data;
  }

  return (
    <table className='table-auto w-full border border-gray-300 shadow-lg rounded-lg'>
      <thead className='bg-gray-200 text-gray-700'>
        <tr>
          <th className='px-4 py-2 border-b border-gray-300'>#</th>
          <th className='px-4 py-2 border-b border-gray-300'>Crypto Name</th>
          <th className='px-4 py-2 border-b border-gray-300'>Current Price</th>
          <th className='px-4 py-2 border-b border-gray-300'>Purchase Price</th>
          <th className='px-4 py-2 border-b border-gray-300'>Investment Amount</th>
          <th className='px-4 py-2 border-b border-gray-300'>Purchase Date</th>
          <th className='px-4 py-2 border-b border-gray-300'>Return</th>
          <th className='px-4 py-2 border-b border-gray-300'>Profit / Loss</th>
          <th className='px-4 py-2 border-b border-gray-300'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.length === 0 ? (
          <tr>
            <td colSpan={7} className='text-center py-4 text-gray-500'>
              No portfolio data available.
            </td>
          </tr>
        ) : (
          dataTable.map((item, index) => (
            <tr
              key={`${JSON.stringify(item)}`}
              className={
                index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
              }>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                {index + 1}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                {item.name}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                ${Intl.NumberFormat("en-US").format(item.currentPrice)}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                ${Intl.NumberFormat("en-US").format(item.purchaseCost)}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                ${Intl.NumberFormat("en-US").format(item.investmentAmount)}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                {item.purchaseDate
                  ? format(new Date(item.purchaseDate), "MM-dd-yyyy")
                  : ""}
              </td>
              <td
                className={`px-4 py-2 border-b border-gray-300 text-center ${
                  item.return >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                {item.return >= 0 ? "+" : ""}
                {(item.return).toFixed(2)}%
              </td>
              <td
                className={`px-4 py-2 border-b border-gray-300 text-center ${
                  item.return >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                {item.profitLoss >= 0 ? "+" : ""}
                {(item.profitLoss).toFixed(2)}
              </td>
              <td className='px-4 py-2 border-b border-gray-300 text-center'>
                <Link
                  to={`/detail/${item.id}`}
                  className='text-blue-500 hover:underline'>
                  <Tooltip title='More info'>
                    <InfoIcon />
                  </Tooltip>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => {
                    setDataTable(dataTable.filter((row) => row.id !== item.id));
                    const filterCrypto = cryptosInvestmentPortfolio.filter((record) => record.crypto?.id !== item.id && record.purchaseDate !== item.purchaseDate);
                    updateCryptosInvestmentPortfolio(filterCrypto);
                  }}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
