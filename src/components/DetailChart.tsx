import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";
import CryptoDetailCard from "./CryptoDetails";

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface DetailChartProps {
  cryptoId: string;
}

// Define the type for fetched data
type ChartData = [number, number][];

const fetchMarketChart = async (cryptoId: string, timeRange: string): Promise<ChartData> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=USD&days=${timeRange}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.prices;
};

const DetailChart: React.FC<DetailChartProps> = ({ cryptoId }) => {
  const {cryptosInfo} = usePortfolio();
  const cryptoDetail = cryptosInfo.find(item => item.id === cryptoId);
  const [timeRange, setTimeRange] = useState<string>("1"); // Default to 24 hours

  const { data: chartData = [], isLoading, isError } = useQuery<ChartData>({
    queryKey: ["marketChart", cryptoId, timeRange],
    queryFn: () => fetchMarketChart(cryptoId, timeRange),
    enabled: !!cryptoId, // Only fetch if cryptoId exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
    }
  );

  // Prepare data for the Line chart
  const data = {
    labels: (chartData as any[]).map((item) => {
      const date = new Date(item[0]);
      if (timeRange === "1") {
        return date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (timeRange === "30") {
        return date.toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });
      }
    }),
    datasets: [
      {
        label: "Price (USD)",
        data: (chartData as any[]).map((item) => item[1]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
      },
      y: {
        title: { display: true, text: "Price (USD)" },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-4 bg-gray-50">
  {/* Crypto Detail Card */}
  {cryptoDetail && <CryptoDetailCard cryptoDetail={cryptoDetail} />}

  {/* Market Chart Section */}
  <Card className="mt-6 shadow-lg">
    <CardContent>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
        <Typography variant="h6" component="h2" className="font-bold">
          Market Chart
        </Typography>
        <FormControl variant="standard" size="small" className="w-full lg:w-1/4">
          <InputLabel id="timeRangeLabel">Select Time Range</InputLabel>
          <Select
            labelId="timeRangeLabel"
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white"
          >
            <MenuItem value="1">24 Hours</MenuItem>
            <MenuItem value="30">30 Days</MenuItem>
            <MenuItem value="90">3 Months</MenuItem>
            <MenuItem value="365">1 Year</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Chart or Loading/Error */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : isError ? (
          <Typography variant="body1" color="error" className="text-center">
            Error loading chart data. Please try again later.
          </Typography>
        ) : (
          <div className="overflow-x-auto">
            <Line data={data} options={options} />
          </div>
        )}
      </div>
    </CardContent>
  </Card>
</div>
  );
};

export default DetailChart;