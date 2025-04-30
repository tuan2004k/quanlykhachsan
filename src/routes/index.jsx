
import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import Dashboard from "../Screens/Customers/Dashboard"; // Home.jsx là Dashboard

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
  {
    path: "/user/home",
    element: <Dashboard />, // Home.jsx
  },
]);
