import { Outlet } from "react-router-dom";
import Header from "../../widgets/header/Header";

const MainLayout = () => {
  // для иконок - npm install @ant-design/icons
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
