import Pagination from "react-bootstrap/Pagination";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { expenseAction } from "../../Store/expense-reducer";
import { useSelector, useDispatch } from "react-redux";
const Pagechanger = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getCount = async () => {
      const response = await axios.get(
        "http://localhost:3000/expense/get-expense-count",
        {
          headers: { Authorisation: token },
        }
      );
        console.log("use")
        const pages = response.data.pages;
        setTotalPages(pages);
    };
    getCount();
    

  }, []);
  console.log(totalPages)
  const pageHandler = (e) => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
  
        const response = await fetch(
          "http://localhost:3000/expense/get-expenses/"+e,
          {
            headers: { Authorisation: token },
          }
        );
        const data = await response.json();
        dispatch(expenseAction.addExpense(data));
      };
      fetchData();
    setSelectedPage(e);
  };
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === selectedPage}
        onClick={() => pageHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default Pagechanger;
