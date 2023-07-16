import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./auth.module.css";
const Auth = () => {
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = event.target.formBasicName.value;
    const enteredEmail = event.target.formBasicEmail.value;
    const enteredPassword = event.target.formBasicPassword.value;
    console.log(enteredName, enteredEmail, enteredPassword);
    const obj = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <Fragment>
      <Form className={classes.formBox} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </Fragment>
  );
};

export default Auth;
