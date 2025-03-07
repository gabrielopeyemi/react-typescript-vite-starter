import React, { useState } from "react";
import ExchangeRateForm from "../component/ExchangeRateForm";
import { ExchangeRate, SCREEN } from "../utility/types";
import apiClient from "../service";

interface UpdateProps {
  setScreen: (value: SCREEN) => void;
  country: ExchangeRate;
}

const Update: React.FC<UpdateProps> = ({ setScreen, country }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleUpdate = async (data: ExchangeRate) => {
    setIsLoading(true)
    const payload = {
      priceAgainstUSD: data?.priceAgainstUSD ? Number(data?.priceAgainstUSD) : 1,
      USDagainstPrice: data?.USDagainstPrice ? Number(data?.USDagainstPrice) : 1,
    }
    try {
      const response = await apiClient.put(`/payaza-exchange-rate/${country._id}`, payload );
  
      // Axios response does not have `.ok`
      if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
  
      console.log("Exchange Rate Updated:", response.data);
      setIsLoading(false)
      setScreen(SCREEN.HOME);
    } catch (error) {
      setIsLoading(false)
      console.error("Error updating exchange rate:", error);
      alert("Failed to update exchange rate. Please try again.");
    }
  };
  

  const initialData: ExchangeRate = country;

  return (
    <ExchangeRateForm
      initialData={initialData}
      onSubmit={handleUpdate}
      setScreen={setScreen}
      isLoading={isLoading}
    />
  );
};

export default Update;