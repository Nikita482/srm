import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layout/MainLayout";
import CalendarPage from "../../pages/Calendar";
import CoffeePage from "../../pages/Coffee";
import GoalsPage from "../../pages/Goals";

const router = createBrowserRouter([
  {
    path: paths.layout,
    element: <MainLayout />,
    children: [
      {
        path: paths.calendar,
        element: <CalendarPage />,
      },
      {
        path: paths.coffee,
        element: <CoffeePage />,
      },
      {
        path: paths.goals,
        element: <GoalsPage />,
      },
    ],
  },
]);

export default router;
