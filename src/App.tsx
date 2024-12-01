import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PortfolioPage from "./pages/PortfolioPage";
import DetailPage from "./pages/DetailPage";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Container } from "@mui/material";

function App() {
  return (
    <div className='bg-crypto-bg bg-cover bg-center min-h-screen'>
      <Container>
        <PortfolioProvider>
        <Router>
          <Routes>
            {/* Define the routes */}
            <Route path='/' element={<PortfolioPage />} />
            <Route path='/detail/:cryptoId' element={<DetailPage />} />
          </Routes>
          </Router>
        </PortfolioProvider>
      </Container>
    </div>
  );
}

export default App;
