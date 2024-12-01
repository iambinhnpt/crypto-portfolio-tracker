import React, { useMemo } from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";

interface CryptoDetail {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

interface DetailProps {
  cryptoDetail: CryptoDetail;
}

const CryptoDetailCard: React.FC<DetailProps> = ({ cryptoDetail }) => {
  const {
    name,
    symbol,
    image,
    current_price,
    market_cap,
    total_volume,
    circulating_supply,
    max_supply,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    market_cap_rank,
  } = cryptoDetail;

  const formatDate = (date: string | undefined) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const details = useMemo(
    () => [
      { label: "Current Price", value: `$${current_price?.toLocaleString()}` },
      { label: "Market Cap", value: `$${market_cap?.toLocaleString()}` },
      { label: "Total Volume", value: `$${total_volume?.toLocaleString()}` },
      { label: "24h High", value: `$${high_24h?.toLocaleString()}` },
      { label: "24h Low", value: `$${low_24h?.toLocaleString()}` },
      {
        label: "Price Change (24h)",
        value: `${price_change_percentage_24h?.toFixed(2)}% ($${price_change_24h?.toLocaleString()})`,
        className: price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600",
      },
      { label: "Market Rank", value: market_cap_rank || "N/A" },
      { label: "Circulating Supply", value: circulating_supply?.toLocaleString() || "N/A" },
      { label: "Max Supply", value: max_supply ? max_supply.toLocaleString() : "N/A" },
      {
        label: "All-Time High",
        value: `$${ath?.toLocaleString()} (${ath_change_percentage?.toFixed(2)}%) on ${formatDate(ath_date)}`,
      },
      {
        label: "All-Time Low",
        value: `$${atl?.toLocaleString()} (${atl_change_percentage?.toFixed(2)}%) on ${formatDate(atl_date)}`,
      },
    ],
    [
      current_price,
      market_cap,
      total_volume,
      high_24h,
      low_24h,
      price_change_24h,
      price_change_percentage_24h,
      market_cap_rank,
      circulating_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
    ]
  );

  return (
    <div className="container mx-auto py-3">
      <Card className="shadow-lg mx-auto">
        <CardContent className="flex justify-center items-center text-center">
          <Avatar
            src={image}
            alt={name}
            sx={{ width: 80, height: 80, mx: 2 }}
          />
          <Typography variant="h5" component="div" className="text-center mb-4">
            {name} ({symbol?.toUpperCase()})
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={3}>
            {details.map(({ label, value, className = "" }, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Typography variant="body1" className="font-semibold">
                  {label}:
                </Typography>
                <Typography variant="body2" className={className}>
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDetailCard;