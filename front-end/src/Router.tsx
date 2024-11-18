import { createBrowserRouter, Navigate } from "react-router-dom";
import ResultsPage from "./pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Navigate replace to="/results" />,
      },
      {
        path: "results",
        element: <ResultsPage />,
      },
    ],
  },
]);

export default router;
