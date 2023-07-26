import { useParams } from "react-router";
import { Fragment } from "react";
import { Button, Container, Table } from "react-bootstrap";
import classes from "./reportGeneration.module.css";
import Header from "../Header/header";
const ReportGeneration = () => {
  const { state } = useParams();

  return (
    <Fragment>
      <Header />
      <h1 className={classes.heading}>Day to Day Expense</h1>
      <Container>
        <Table striped bordered >
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            {/* <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
      <div className={classes.btn}>
        <Button>Download Expenses</Button>
      </div>
    </Fragment>
  );
};

export default ReportGeneration;
