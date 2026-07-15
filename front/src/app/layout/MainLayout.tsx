import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Link to="/page1">page 1</Link>
      <Link to="/page2">page 2</Link>
    </>
  );
};

export default MainLayout;
