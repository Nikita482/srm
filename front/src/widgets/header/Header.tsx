import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "/income",
      label: "Доходы",
    },
    {
      key: "/expenses",
      label: "Расходы",
    },
    {
      key: "/goals",
      label: "Цели",
    },
  ];

  return (
    <>
      <Menu
        className={style.menu}
        items={items}
        mode="horizontal"
        onClick={(item) => navigate(item.key)}
        theme="dark"
      />
    </>
  );
};

export default Header;
