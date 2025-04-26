import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/dashboard";
import GeneralSettings from "./pages/Settings/GeneralSettings";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services/Services";
import Consumers from "./pages/Users/Consumers";
import Bookings from "./pages/Orders/Bookings";
import Refunds from "./pages/Orders/Refunds";
import Jadu from "./pages/Settings/Help/ContactUs";
import AdminLayout from "./components/core/admin-layout";
import Sahayaata from "./pages/Users/Sahayaata";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "services",
        element: <Services />
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Navigate to="sahayata" replace />
          },
          { path: "sahayata", element: <Sahayaata /> },
          { path: "consumers", element: <Consumers /> }
        ]
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <Navigate to="bookings" replace />
          },
          { path: "bookings", element: <Bookings /> },
          { path: "refunds", element: <Refunds /> }
        ]
      },
      {
        path: "settings",
        children: [
          {
            index: true,
            element: <Navigate to="general" replace />
          },
          { path: "general", element: <GeneralSettings /> },
          {
            path: "help",
            children: [
              {
                index: true,
                element: <Navigate to="contact-us" replace />
              },
              { path: "contact-us", element: <Jadu /> },
            ]
          },

        ]
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;



