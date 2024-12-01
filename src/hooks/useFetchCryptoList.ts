import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the structure of a single Crypto
export interface Crypto {
  id: string;
  symbol: string;
  name: string;
}

export interface CryptoDetail {
  id: string;
  symbol: string;
  name: string;
  price_change_percentage_24h: number;
  current_price: number;
}

const fetchCryptos = async (): Promise<{ data: CryptoDetail[]; total: number }> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets`,
    {
      params: {
        vs_currency: "usd",
      },
    }
  );

  // Returning both the data and total count (for pagination check)
  return {
    data: response.data.map((item: any) => ({
      ...item,
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      price_change_percentage_24h: item.price_change_percentage_24h,
      current_price: item.current_price,
    })),
    total: response.data.length,
  };
};

// Custom hook to fetch cryptos with pagination and search
export const useFetchCryptoList = () => {
  const { data, isFetching, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["cryptoList"], // Corrected usage
    queryFn: () => fetchCryptos(),
    placeholderData: (prev) => prev, // Retain previous results while fetching new ones
  });
  const cryptos = data ? data.data : []; // Extract crypto list from data
  const total = data ? data.total : 0; // Extract total count for pagination
  return {
    cryptos,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    total
  };
};