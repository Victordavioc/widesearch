import { createBrowserRouter, Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Navigate replace to="/surch" />,
      },
      {
        path: "surch",
        element: <SearchPage />,
      },
      {
        path: "results",
        element: <ResultsPage />,
      },
    ],
  },
]);

export default router;
