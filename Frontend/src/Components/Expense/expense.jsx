import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./expense.css";
import { useNavigate } from "react-router";
const Expense = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/expense/get-expenses",
        {
          headers: { Authorisation: token },
        }
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [state]);
  const editHandler = (e) => {
    const amount = e.amount;
    const description = e.description;
    const category = e.category;
    const id = e.id;
    const update = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/expense/delete-expense/" + id,
        {
          method: "DELETE",
          headers: {
            Authorisation: token,
          },
        }
      );

      if (response.ok) {
        amountRef.current.focus();
        amountRef.current.value = amount;
        descriptionRef.current.value = description;
        categoryRef.current.value = category;
        setState((prev) => !prev);
      } else {
        console.error("Error occured");
        alert("Not enough product");
      }
    };
    update();
  };
  const deleteHandler = (e) => {
    const deleteProduct = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/expense/delete-expense/" + e,
        {
          method: "DELETE",
          headers: {
            Authorisation: token,
          },
        }
      );
      if (response.ok) {
        setState((prev) => !prev);
      }
    };
    deleteProduct();
  };
  const liElement = data.map((item) => {
    return (
      <li key={item.id}>
        <span className="box-div">
          <h4>Rs {item.amount}/-</h4>
        </span>
        <span className="box-div">
          <p>{item.description}</p>
        </span>
        <span className="box-div">
          <p> {item.category} </p>
        </span>
        <span className="box-div">
          <button onClick={() => editHandler(item)}> Edit</button>
        </span>
        <span className="box-div">
          <button className="btn-danger" onClick={() => deleteHandler(item.id)}>
            Delete
          </button>
        </span>
      </li>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = event.target.pqty.value;
    const enteredDescription = event.target.pdes.value;
    const enteredCategory = event.target.pcategory.value;

    const obj = {
      quantity: enteredQuantity,
      description: enteredDescription,
      category: enteredCategory,
    };
    const token = localStorage.getItem("token");
    const postData = async () => {
      const response = await fetch(
        "http://localhost:3000/expense/add-expense",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            Authorisation: token,
          },
        }
      );
      if (response.ok) {
        setState((prev) => !prev);
      }
    };
    postData();
    event.target.pdes.value = "";
    event.target.pcategory.value = "";
    event.target.pqty.value = "";
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <Fragment>
      <div className="formdiv">
        <Button onClick={logoutHandler}>Logout</Button>

        <h1>Expense Tracker</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="pqty">Choose Expense Amount : </label>
          <input
            type="number"
            name="productQuantity"
            id="pqty"
            ref={amountRef}
            required
          />
          <label htmlFor="pdes">Choose Description : </label>
          <input
            type="text"
            name="productDescription"
            id="pdes"
            ref={descriptionRef}
            required
          />
          <label htmlFor="pcategory">Choose Category : </label>
          <select id="pcategory" ref={categoryRef}>
            <option value="Food">Food</option>
            <option value="Fuel">Fuel</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div className="list">
        {liElement.length > 0 && (
          <ul>
            <li>
              <span className="box-div">
                <h3>Amount</h3>
              </span>
              <span className="box-div">
                <h3>Description</h3>
              </span>
              <span className="box-div">
                <h3>Category</h3>
              </span>

              <span className="box-div"></span>
              <span className="box-div"></span>
            </li>
            <hr />
            {liElement}
          </ul>
        )}
        {liElement.length === 0 && <h2>No Products Available</h2>}
      </div>
    </Fragment>
  );
};

export default Expense;
