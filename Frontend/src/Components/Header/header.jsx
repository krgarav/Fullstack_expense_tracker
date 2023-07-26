import { Fragment, useEffect, useState } from "react";
import classes from "./header.module.css";
import { Nav, Container, Button, Navbar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import LeaderBoard from "../Models/leaderboard";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  const [state, setState] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
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
          setState(true);
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
  const leaderboardHandler = () => {
    const getData = async () => {
      const res = await axios.get(
        "http://localhost:3000/purchase/premium/showLeaderBoard"
      );
      console.log(res.data);
      setUsers(res.data);
      setModalShow(true);
    };
    getData();
  };
  const url = `/reportgeneration/${state}`;
  return (
    <Fragment>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <LinkContainer to="/expenses">
            <Navbar.Brand as="a">Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to={url}>
                <Nav.Link as="a">Day to Day Expenses</Nav.Link>
              </LinkContainer>
            </Nav>
            <div className={btn}>
              {!state && (
                <Button variant="outline-success" onClick={premiumHandler}>
                  Buy Premium
                </Button>
              )}

              {state && (
                <Button variant="info">
                  You are premium user
                  <Button onClick={leaderboardHandler}>
                    Show LeaderBoard
                  </Button>{" "}
                </Button>
              )}
              <Button variant="outline-warning" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LeaderBoard
        show={modalShow}
        item={users}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  );
};

export default Header;
