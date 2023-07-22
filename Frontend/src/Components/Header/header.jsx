import { Fragment, useEffect, useState } from "react";
import classes from "./header.module.css";
import { Nav, Container, Button, Navbar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

const Header = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    const status = localStorage.getItem("userStatus");

    if (status === "true") {
      setState(true);
    }
  }, [state]);
  const navigate = useNavigate();
  const btn = `${classes.navbtn} d-flex`;
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  // console.log(state);
  const premiumHandler = () => {
    const token = localStorage.getItem("token");
    const getPremium = async () => {
      const response = await axios.get(
        "http://localhost:3000/purchase/premium",
        {
          headers: { Authorisation: token },
        }
      );

      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          const res = await axios.post(
            "http://localhost:3000/purchase/updateTransactionStatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            {
              headers: { Authorisation: token },
            }
          );

          alert("you are premium user now");
        },
      };
      const rzpl = new Razorpay(options);
      rzpl.open();

      rzpl.on("payment.failed", (response) => {
        console.log(response);
        alert(JSON.stringify(response.error.description));
      });
    };
    getPremium();
  };
  return (
    <Fragment>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>

              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <div className={btn}>
              {!state && (
                <Button variant="outline-success" onClick={premiumHandler}>
                  Buy Premium
                </Button>
              )}

              {state && <Button variant="info">You are premium user</Button>}
              <Button variant="outline-warning" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1 className={classes.header}>Expense Tracker</h1>
    </Fragment>
  );
};

export default Header;
