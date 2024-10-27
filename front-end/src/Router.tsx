import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Navigate replace to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
