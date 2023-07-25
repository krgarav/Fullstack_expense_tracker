import "./App.css";
import Auth from "./Components/AuthPage/auth";
import { Route, Routes } from "react-router";
import Expense from "./Components/Expense/expense";
import ForgotPassword from "./Components/AuthPage/forgotpassword";
import Password from "./Components/AuthPage/password";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:userId" element={<Password />} />
    </Routes>
  );
}

export default App;
