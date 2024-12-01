import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";


export interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

interface CryptoAutoCompleteProps {
  onSelect: (crypto: Crypto | null) => void;
  cryptos: Crypto[];
  isLoading: boolean;
  defaultValue: Crypto | null;

}

const CryptoAutoComplete: React.FC<CryptoAutoCompleteProps> = ({ onSelect, cryptos, isLoading, defaultValue }) => {
  const [search, setSearch] = useState<string>("");
  const cryptosData = search === "" ? cryptos : cryptos.filter(crypto => {
    return crypto.id.includes(search) || crypto.name.includes(search) || crypto.symbol.includes(search)
   })
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  

  const handleSelect = (event: SyntheticEvent<Element, Event>, newValue: string |Crypto | null) => {
    if(typeof newValue === "string" ) {
        const value = cryptosData.find(crypto => crypto.id);
        onSelect(value || null); 
    }else {
        onSelect(newValue || null);
    }
  };  

  return (
    <Box>
      <Autocomplete
        freeSolo
        key={`cryptoAutoComplete-${JSON.stringify(defaultValue)}`}
        options={cryptosData}
        getOptionLabel={(option) => {
            if(typeof option === "string" ) return option;
            return `${option.name} (${option.symbol})`
        }}
        onInputChange={(_, newInputValue) => {
            const eventValue = { target: { value: newInputValue } } as ChangeEvent<HTMLInputElement>;
            handleInputChange(eventValue)
        }}
        onChange={handleSelect}
        defaultValue={defaultValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Cryptocurrencies"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name} ({option.symbol})
          </li>
        )}
      />
    </Box>
  );
};

export default CryptoAutoComplete;