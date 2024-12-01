import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePortfolio } from "../context/PortfolioContext";
import "@testing-library/jest-dom";
import DetailChart from "../components/DetailChart";

jest.mock("../context/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="chart"></div>,
}));

const queryClient = new QueryClient();

describe("DetailChart", () => {
  const mockPortfolio = {
    cryptosInfo: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://example.com/bitcoin.png",
        current_price: 50000,
        market_cap: 900000000,
        total_volume: 3000000,
        circulating_supply: 19000000,
        max_supply: 21000000,
        ath: 65000,
        ath_change_percentage: -23,
        ath_date: "2021-11-10",
        atl: 67.81,
        atl_change_percentage: 73745.34,
        atl_date: "2013-07-06",
        high_24h: 51000,
        low_24h: 49000,
        price_change_24h: 1000,
        price_change_percentage_24h: 2.0,
        market_cap_rank: 1,
      },
    ],
  };

  beforeEach(() => {
    (usePortfolio as jest.Mock).mockReturnValue(mockPortfolio);
  });

  it("renders the component and crypto details card", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailChart cryptoId="bitcoin" />
      </QueryClientProvider>
    );

    expect(screen.getByText("Bitcoin (BTC)")).toBeInTheDocument();
    expect(screen.getByText("Market Chart")).toBeInTheDocument();
  });

  it("displays loading state during API fetch", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailChart cryptoId="bitcoin" />
      </QueryClientProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });


  it("renders chart data correctly after fetching", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            prices: [
              [1634235600000, 50000],
              [1634322000000, 50500],
            ],
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <DetailChart cryptoId="bitcoin" />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("chart")).toBeInTheDocument();
  });
});