import { Outlet } from "react-router-dom";
import Header from "../../widgets/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
