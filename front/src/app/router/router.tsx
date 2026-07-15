import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import MainLayout from "../layout/MainLayout";
import TestPage from "../../pages/testPage";
import TestPage2 from "../../pages/testPage2";

const router = createBrowserRouter([
  {
    path: paths.layout,
    element: <MainLayout />,
    children: [
      {
        path: paths.page1,
        element: <TestPage />,
      },
      {
        path: paths.page2,
        element: <TestPage2 />,
      },
    ],
  },
]);

export default router;
