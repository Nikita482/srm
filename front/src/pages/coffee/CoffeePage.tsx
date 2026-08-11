import { Flex } from "antd";
import CoffeeControls from "./components/coffeeControls/CoffeeControls";
import CoffeeTable from "./components/coffeeTable/CoffeeTable";

const CoffeePage = () => {
  return (
    <Flex vertical gap={10} style={{ padding: "10px" }}>
      <CoffeeControls />
      <CoffeeTable />
    </Flex>
  );
};

export default CoffeePage;
