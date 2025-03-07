import ExchangeRateForm from "../component/ExchangeRateForm";
import { ExchangeRate, SCREEN } from "../utility/types";

interface CreateProps {
  setScreen: (value: SCREEN) => void;
}

const Create: React.FC<CreateProps> = ({ setScreen }) => {
  const handleCreate = (data: ExchangeRate): void => {
    console.log("New Exchange Rate Created:", data);
  };

  return (
    <ExchangeRateForm onSubmit={handleCreate} setScreen={setScreen} isLoading={false} />
  );
};

export default Create;