import { Fragment } from "react";
import "./App.css";
import Auth from "./Components/AuthPage/auth";
import { Route, Routes } from "react-router";
import Expense from "./Components/Expense/expense";
function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      {token && <Route path="/expenses" element={<Expense />} />}
    </Routes>
  );
}

export default App;
