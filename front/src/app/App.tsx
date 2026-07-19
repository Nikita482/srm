import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import "./dayjs";

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
