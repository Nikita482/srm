import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";

const CoffeeDashboard = () => {
  const { months } = useCoffeeMonth();

  console.log("CSC:", months);

  return (
    <>
      <h1>CoffeeDashboard</h1>
    </>
  );
};

export default CoffeeDashboard;
