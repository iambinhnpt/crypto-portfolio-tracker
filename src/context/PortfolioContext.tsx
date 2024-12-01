import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetchCryptoList } from "../hooks/useFetchCryptoList";

// Define the context type
interface PortfolioContextType {
    cryptosInfo: any[];
    cryptosInvestmentPortfolio: any[],
    isLoading: boolean;
    updateCryptosInvestmentPortfolio: (newCryptos: any[]) => void;
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Create the provider component
export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cryptos: cryptosInfo, isLoading } = useFetchCryptoList();
  const [cryptosInvestmentPortfolio, setCryptosInvestmentPortfolio] = useState(JSON.parse(localStorage.getItem('crypto') || '[]'));

  // Function to update the `cryptos` state
  const updateCryptosInvestmentPortfolio = (newCryptos: any[]) => {
    setCryptosInvestmentPortfolio(newCryptos);
  };

  useEffect(() => {
    localStorage.setItem('crypto', JSON.stringify(cryptosInvestmentPortfolio));

  }, [cryptosInvestmentPortfolio])
  

  return (
    <PortfolioContext.Provider value={{ cryptosInfo, isLoading, updateCryptosInvestmentPortfolio, cryptosInvestmentPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the Portfolio context
export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};