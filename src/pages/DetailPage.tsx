import React from "react";
import { useParams, Link } from "react-router-dom";
import DetailChart from "../components/DetailChart";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const DetailPage = () => {
  const { cryptoId } = useParams<{ cryptoId: string }>();

  return (
    <div className='max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen'>
      <div className='bg-white rounded-lg shadow-xl p-6 mb-6'>
        {/* Home Button */}
        <Link to='/' className='mb-4 inline-block'>
          <HomeIcon fontSize='large' />
        </Link>

        <Typography
          variant='h4'
          component='h1'
          className='text-center text-gray-800 font-bold mb-6'>
          Crypto Details: {cryptoId}
        </Typography>
        <Divider className='mb-6' />
        <div className='flex justify-center mb-6'>
          <DetailChart cryptoId={cryptoId || ""} />
        </div>
        <Card className='shadow-lg mx-auto'>
          <CardContent className='text-center py-6'>
            <Typography
              variant='h6'
              className='text-gray-700 font-semibold mb-4'>
              Overview
            </Typography>
            <Typography variant='body1' className='text-gray-600 mb-2'>
              Learn more about {cryptoId}'s current market performance and
              analytics.
            </Typography>
            <Typography variant='body2' className='text-gray-500'>
              Stay updated with the latest trends and key metrics of your
              favorite cryptocurrency.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <footer className='text-center text-gray-500 py-4'>
        <Typography variant='body2'>
          © {new Date().getFullYear()} Crypto Tracker. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default DetailPage;
