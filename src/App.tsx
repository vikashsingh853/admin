import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/dashboard";
import GeneralSettings from "./pages/Settings/GeneralSettings";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services/Services";
import Consumers from "./pages/Users/Consumers";
import Jadu from "./pages/Settings/Help/ContactUs";
import AdminLayout from "./components/core/admin-layout";
import Sahayaata from "./pages/Users/Sahayaata";
import Bookings from "./pages/Orders/bookings/Bookings";
import Refunds from "./pages/Orders/refunds/Refunds";
import UserAddForm from "./components/Users/UserAddForm";
import UserDetails from "./components/Users/UserDetails";
import AddBooking from "./pages/Orders/bookings/AddBooking";
import BookingDetails from "./pages/Orders/bookings/BookingDetails";
import LoginPage from "./pages/auth/login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute> ,
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
          { path: "consumers", element: <Consumers /> },
          { path: "form/:mode", element: <UserAddForm /> },
          { path: "form/:mode/:id", element: <UserAddForm /> },
          { path: ":id", element: <UserDetails /> }
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
          { path: "refunds", element: <Refunds /> },
          { path: "bookings/form/:mode", element: <AddBooking /> },
          { path: "bookings/form/:mode/:id", element: <AddBooking /> },
          { path: "bookings/:id", element: <BookingDetails /> }
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

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;











// <Route index element={<Navigate to="/dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="services" element={<Services />} />
//             <Route path="users" element={<ProtectedRoute><Consumers /></ProtectedRoute>}>
//               <Route index element={<Navigate to="sahayata" replace />} />
//               <Route path="sahayata" element={<Sahayaata />} />
//               <Route path="consumers" element={<Consumers />} />
//               <Route path="form/:mode" element={<ProtectedRoute><UserAddForm /></ProtectedRoute>} />
//               <Route path="form/:mode/:id" element={<ProtectedRoute><UserAddForm /></ProtectedRoute>} />
//               <Route path=":id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
//             </Route>
//             <Route path="orders" element={<ProtectedRoute><Bookings /></ProtectedRoute>}>
//               <Route index element={<Navigate to="bookings" replace />} />
//               <Route path="bookings" element={<Bookings />} />
//               <Route path="bookings/form/:mode" element={<ProtectedRoute><AddBooking /></ProtectedRoute>} />
//               <Route path="bookings/form/:mode/:id" element={<ProtectedRoute><AddBooking /></ProtectedRoute>} />
//               <Route path="bookings/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
//               <Route path="refunds" element={<ProtectedRoute><Refunds /></ProtectedRoute>} />
//             </Route>
//             <Route path="settings" element={<ProtectedRoute><GeneralSettings /ute>}>
//               <Route indeigate to="general" replace />} />
//               <Route path="general" element={<GeneralSettings />} />
//               <Route path="help" element={<ProtectedRoute><ContactUs /></ProtectedRoute>}>
//                 <Route index element={<Navigate to="contact-us" replace />} />
//                 <Route path="contact-us" element={<ContactUs />} />
//               </Route>
//             </Route>
//           </Route>
//         </Routes>
//       </Router >