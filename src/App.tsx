import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import ViewUser from "./pages/Dashboard/ViewUser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    index: true,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <Dashboard />,
        children: [
          {
            path: "users",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "view_user/:user_id",
        element: <ViewUser />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
