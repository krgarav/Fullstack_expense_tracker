import { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./auth.module.css";
const Auth = () => {
  const [state, setState] = useState(true);

  const stateHandler = () => {
    setState((prev) => {
      return !prev;
    });
    console.log(state);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = event.target.formBasicName.value;
    const enteredEmail = event.target.formBasicEmail.value;
    const enteredPassword = event.target.formBasicPassword.value;
    const obj = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };
    const postData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/signup", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json()
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };
  return (
    <Fragment>
      <div className={classes.formBox}>
        <h3>{state ? "Login" : "Signup"}</h3>
        <Form onSubmit={submitHandler}>
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

          <Button variant="primary" type="submit">
            {state ? "Login" : "Sign up"}
          </Button>
        </Form>
      </div>
      <div>
        <p
          onCopy={(e) => {
            return e.preventDefault();
          }}
          onSelectStart={(e) => {
            return e.preventDefault();
          }}
          className={classes.toggler}
          onClick={stateHandler}
          contentEditable={false}
        >
          Existing user - Login
        </p>
      </div>
    </Fragment>
  );
};

export default Auth;
