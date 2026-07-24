import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layout/MainLayout";
import CalendarPage from "../../pages/calendar/Calendar";
import CoffeePage from "../../pages/coffee/CoffeePage";
import NewCoffeePage from "../../pages/newCoffee/CoffeePage";
import GoalsPage from "../../pages/goals/Goals";

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
        path: paths.newCoffee,
        element: <NewCoffeePage />,
      },
      {
        path: paths.goals,
        element: <GoalsPage />,
      },
    ],
  },
]);

export default router;
