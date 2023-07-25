import axios from "axios";
import { Fragment, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";

const ForgotPassword = () => {
  const mailRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredMail = mailRef.current.value;
    console.log(mailRef.current.value);
    axios.post("http://localhost:3000/password/forgotpassword", {
      mail: enteredMail,
    });
  };

  return (
    <Fragment>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              ref={mailRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
