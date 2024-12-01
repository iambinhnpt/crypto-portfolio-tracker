import React, { useState } from "react";
import CryptoAutoComplete from "./CryptoAutoComplete";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, FilledInput, FormControl, InputAdornment, InputLabel } from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";
interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

export interface FormCryptoValue {
    crypto: Crypto | null,
    averageCost: number | string,
    investmentAmount: number | string,
    purchaseDate: Date | null
}
const AddProductForm = () => {
  const initFormValue = {
    crypto: null,
    averageCost: 0,
    investmentAmount: 0,
    purchaseDate: null
  };
  const [formValue, setFormValue] = useState<FormCryptoValue>(initFormValue);
  const { cryptosInfo, isLoading, cryptosInvestmentPortfolio, updateCryptosInvestmentPortfolio } = usePortfolio();

  const handleSelectCrypto = (crypto: Crypto | null) => {
    setFormValue({...formValue, crypto})
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  
    setFormValue(initFormValue);
    const formatFormValue = {...formValue, averageCost: parseFloat(String(formValue.averageCost).replaceAll(",","")), investmentAmount: parseFloat(String(formValue.investmentAmount).replaceAll(",",""))};
    updateCryptosInvestmentPortfolio([...cryptosInvestmentPortfolio, formatFormValue ]);
    alert("Crypto added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white space-y-4 border-2 p-4 my-12 mx-auto w-1/2 min-w-96">
      <div>
        <CryptoAutoComplete onSelect={handleSelectCrypto} defaultValue={formValue.crypto} cryptos={cryptosInfo} isLoading={isLoading}/>
      </div>
      <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Average Cost</InputLabel>
          <FilledInput
             value={formValue.averageCost || ''}
             onChange={(event) =>{
              const valueOnchange = event.target.value;              
              const valueInNumber = Number(valueOnchange.replaceAll(",",""));
              let formattedValue = Intl.NumberFormat("en-US").format(valueInNumber);
              if (valueOnchange.endsWith(".")) {
                formattedValue += ".";
              }
              if(!isNaN(parseFloat(formattedValue))){
                setFormValue({ ...formValue, averageCost: formattedValue })
              }
             }}
            id="filled-adornment-amount"
            placeholder="Enter average cost"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Investment Amount</InputLabel>
          <FilledInput
             value={formValue.investmentAmount || ''}
             onChange={(event) =>{
              let valueOnchange = event.target.value;              
              const valueInNumber = Number(valueOnchange.replaceAll(",",""));
              let formattedValue = Intl.NumberFormat("en-US").format(valueInNumber);
              if (valueOnchange.endsWith(".")) {
                formattedValue += ".";
              }
              if(!isNaN(parseFloat(formattedValue))){
                setFormValue({ ...formValue, investmentAmount: formattedValue })
              }
             }}
            id="filled-adornment-amount"
            placeholder="Enter investment amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Purchase Date"
          format="MM/dd/yyyy"
          value={formValue.purchaseDate || null} // Use null if no date is selected
          onChange={(newValue) => {
            console.log({ newValue });
            setFormValue({ ...formValue, purchaseDate: newValue });
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              className: "border p-2 rounded",
            },
          }}
        />
      </LocalizationProvider>
      </div>

      <div className="flex justify-center">
      <Button variant="outlined" color="primary" type="submit">
        Add Product
      </Button>
      </div>
    </form>
  );
};

export default AddProductForm;