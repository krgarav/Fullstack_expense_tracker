import Pagination from "react-bootstrap/Pagination";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { expenseAction } from "../../Store/expense-reducer";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
const Pagechanger = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const row = localStorage.getItem("preferencerow");
    const getCount = async () => {
      const response = await axios.get(
        "http://localhost:3000/expense/get-expense-count/" + row,
        {
          headers: { Authorisation: token },
        }
      );
      const pages = response.data.pages;
      setTotalPages(pages);
    };
    getCount();
  }, []);

  const pageHandler = (e) => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const row = localStorage.getItem("preferencerow");
      const response = await fetch(
        `http://localhost:3000/expense/get-expenses?e=${e}&row=${row}`,
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
  const rowHandler = (event) => {
    const row = event.target.value;
    localStorage.setItem("preferencerow", row);
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/expense/get-expenses?e=${selectedPage}&row=${row}`,
        {
          headers: { Authorisation: token },
        }
      );
      const data = await response.json();
      dispatch(expenseAction.addExpense(data));
    };
    fetchData();

  };
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <label htmlFor="rowperpage">Row per page : </label>
        <select id="rowperpage" onChange={rowHandler}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {items}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Fragment>
  );
};

export default Pagechanger;
