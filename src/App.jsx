import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import Dashboard from "./Screens/Customers/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/" element={<LoginScreen />} />
        <Route path="user/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;