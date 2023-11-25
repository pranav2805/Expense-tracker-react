import React, { useState } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import classes from "./AddExpense.module.css";

const AddExpense = (props) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    desc: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    // Add logic to handle the addition of the expense (e.g., send to backend)
    console.log("Expense Data:", expenseData);
    // Reset form after submitting
    setExpenseData({
      amount: "",
      desc: "",
      category: "",
    });
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
                    {/* Add more categories as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddExpense;
