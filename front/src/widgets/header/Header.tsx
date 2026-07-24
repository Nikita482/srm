import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "/calendar",
      label: "Календарь",
    },
    {
      key: "/coffee",
      label: "Кофейня",
    },
    {
      key: "/newCoffee",
      label: "Кофейня 2.0",
    },
    {
      key: "/goals",
      label: "Цели",
    },
  ];

  // добавить расоды доходы и тд

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
