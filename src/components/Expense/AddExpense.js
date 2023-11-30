import React, { useState } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import classes from "./AddExpense.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense";

const AddExpense = (props) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    desc: "",
    category: "",
  });

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    // console.log("Expense Data:", expenseData);
    setIsLoading(true);
    //add the new expense to the realtime firebase db
    const resp = await fetch(
      `https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: expenseData.amount,
          desc: expenseData.desc,
          category: expenseData.category,
        }),
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      //   console.log(data);
      alert("Expense added successfully");
      dispatch(
        expenseActions.addExpense({
          id: data.name,
          amount: expenseData.amount,
          desc: expenseData.desc,
          category: expenseData.category,
        })
      );
      // Reset form after submitting
      setExpenseData({
        amount: "",
        desc: "",
        category: "",
      });
    } else {
      alert("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className={classes.card}>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formDesc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    name="desc"
                    value={expenseData.desc}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={expenseData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select category</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="fuel">Fuel</option>
                    <option value="others">Others</option>
                    {/* Add more categories as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                {!isLoading && (
                  <Button variant="primary" onClick={handleAddExpense}>
                    Add Expense
                  </Button>
                )}
                {isLoading && <p>Adding...</p>}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddExpense;
