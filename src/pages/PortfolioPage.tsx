import React from "react";
import AddProductForm from "../components/AddProductForm";
import PortfolioTable from "../components/PortfolioTable";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";


const PortfolioPage = () => {
  return (
    <>
      {/* Portfolio Page Header */}
      <Link to='/' className='mb-4 inline-block py-5'>
      <Stack direction={"row"} alignItems={"center"} >
      <Box p={1}><HomeIcon className=" text-white" fontSize='large' /></Box>
          <Typography
        variant='h4'
        component='h1'
        color="white"
        boxShadow={1}
        className='font-bold'>
         Investment Portfolio
      </Typography>
      </Stack>
     
        </Link>

      <AddProductForm />
      <PortfolioTable />
    </>
  );
};

export default PortfolioPage;
