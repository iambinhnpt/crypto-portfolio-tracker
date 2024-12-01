import React from "react";
import { render, screen } from "@testing-library/react";
import CryptoDetailCard from "../components/CryptoDetails";

describe("CryptoDetailCard", () => {
  const mockCryptoDetail = {
    id: "1",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://example.com/bitcoin.png",
    current_price: 30000,
    market_cap: 500000000,
    total_volume: 100000000,
    circulating_supply: 19000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -56.52,
    ath_date: "2021-11-10T00:00:00.000Z",
    atl: 67.81,
    atl_change_percentage: 44216.0,
    atl_date: "2013-07-05T00:00:00.000Z",
    high_24h: 31000,
    low_24h: 29500,
    price_change_24h: -500,
    price_change_percentage_24h: -1.64,
    market_cap_rank: 1,
  };

  it("renders the crypto details correctly", () => {
    render(<CryptoDetailCard cryptoDetail={mockCryptoDetail} />);

    // Check for basic info
    expect(screen.getByText("Bitcoin (BTC)")).toBeInTheDocument();
    expect(screen.getByAltText("Bitcoin")).toHaveAttribute("src", mockCryptoDetail.image);

    // Check for formatted details
    expect(screen.getByText("Current Price:")).toBeInTheDocument();
    expect(screen.getByText("$30,000")).toBeInTheDocument();

    expect(screen.getByText("Market Cap:")).toBeInTheDocument();
    expect(screen.getByText("$500,000,000")).toBeInTheDocument();

    expect(screen.getByText("24h High:")).toBeInTheDocument();
    expect(screen.getByText("$31,000")).toBeInTheDocument();

    expect(screen.getByText("24h Low:")).toBeInTheDocument();
    expect(screen.getByText("$29,500")).toBeInTheDocument();

    // Check for all-time high details
    expect(screen.getByText(/All-Time High:/)).toBeInTheDocument();
    expect(screen.getByText(/\$69,000/)).toBeInTheDocument();
    expect(screen.getByText(/\(.*-56.52%.*\)/)).toBeInTheDocument();

    // Check for all-time low details
    expect(screen.getByText(/All-Time Low:/)).toBeInTheDocument();
    expect(screen.getByText(/\$67.81/)).toBeInTheDocument();
  });

  it("handles missing optional data gracefully", () => {
    const incompleteCryptoDetail = {
      ...mockCryptoDetail,
      max_supply: null,
      ath_date: '',
    };

    render(<CryptoDetailCard cryptoDetail={incompleteCryptoDetail} />);

    // Max supply
    expect(screen.getByText("Max Supply:")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();

    // ATH Date
    expect(screen.getByText(/All-Time High:/)).toBeInTheDocument();
    expect(screen.getByText(/on N\/A/)).toBeInTheDocument();
  });

  it("applies correct styling for positive and negative price changes", () => {
    render(<CryptoDetailCard cryptoDetail={mockCryptoDetail} />);

    const priceChange = screen.getByText("-1.64% ($-500)");
    expect(priceChange).toHaveClass("text-red-600");

    const positiveChangeDetail = {
      ...mockCryptoDetail,
      price_change_percentage_24h: 2.5,
      price_change_24h: 750,
    };

    render(<CryptoDetailCard cryptoDetail={positiveChangeDetail} />);

    const positivePriceChange = screen.getByText("2.50% ($750)");
    expect(positivePriceChange).toHaveClass("text-green-600");
  });
});