import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layout/MainLayout";
import IncomePage from "../../pages/Income";
import ExpensesPage from "../../pages/Expenses";
import GoalsPage from "../../pages/Goals";
// import TestPage2 from "../../pages/testPage2";
// import TestPage3 from "../../pages/testPage3";

const router = createBrowserRouter([
  {
    path: paths.layout,
    element: <MainLayout />,
    children: [
      {
        path: paths.income,
        element: <IncomePage />,
      },
      {
        path: paths.expenses,
        element: <ExpensesPage />,
      },
      {
        path: paths.goals,
        element: <GoalsPage />,
      },
    ],
  },
]);

export default router;
