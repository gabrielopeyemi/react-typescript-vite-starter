import React, { useState } from "react";
import { SCREEN } from "../utility/types";


interface ExchangeRate {
  _id?: string; // Optional for new entries
  name: string;
  priceAgainstUSD: number;
  currency: string;
  description: string;
  isActive: boolean;
  countryCode: string;
  USDagainstPrice?: number; // Optional field
}

interface ExchangeRateFormProps {
  initialData?: ExchangeRate; 
  onSubmit: (data: ExchangeRate) => void; 
  setScreen: (value: SCREEN) => void;
  isLoading: boolean
}

const ExchangeRateForm: React.FC<ExchangeRateFormProps> = ({ initialData, onSubmit, setScreen, isLoading }) => {
  const [formState, setFormState] = useState<ExchangeRate>({
    _id: initialData?._id || "",
    name: initialData?.name || "",
    priceAgainstUSD: initialData?.priceAgainstUSD || 0,
    currency: initialData?.currency || "",
    description: initialData?.description || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    countryCode: initialData?.countryCode || "",
    USDagainstPrice: initialData?.USDagainstPrice || undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  const buttonText = isLoading 
  ? initialData 
    ? "Updating..." 
    : "Creating..." 
  : initialData 
    ? "Update" 
    : "Create";

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-2 md:mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex align-center">
   
      <h2 className="text-2xl font-bold mb-6">{initialData ? "Update" : "Create"} Exchange Rate</h2>
      </div>

      {/* Country Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Country Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          disabled
          value={formState.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Country Code */}
      <div className="mb-4">
        <label htmlFor="countryCode" className="block text-gray-700 font-bold mb-2">
          Country Code:
        </label>
        <input
          type="text"
          id="countryCode"
          name="countryCode"
          value={formState.countryCode}
          onChange={handleChange}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Price Against USD */}
      <div className="mb-4">
        <label htmlFor="priceAgainstUSD" className="block text-gray-700 font-bold mb-2">
          Price Against USD:
        </label>
        <input
          type="number"
          id="priceAgainstUSD"
          name="priceAgainstUSD"
          value={formState.priceAgainstUSD}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* USD Against Price */}
      <div className="mb-4">
        <label htmlFor="USDagainstPrice" className="block text-gray-700 font-bold mb-2">
          USD Against Price:
        </label>
        <input
          type="number"
          id="USDagainstPrice"
          name="USDagainstPrice"
          value={formState.USDagainstPrice || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>


      {/* Submit Button */}
      <div className="grid grid-cols-12 gap-2">
      <button
        onClick={() => setScreen(SCREEN.HOME)}
        className="w-full col-span-4 border text-blue-500 border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
        Back
      </button>
      <button
        type="submit"
        className="w-full col-span-8 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
        {buttonText}
      </button>
      </div>
    </form>
  );
};

export default ExchangeRateForm;