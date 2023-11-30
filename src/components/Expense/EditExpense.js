import React, { useState, useEffect } from "react";
import { Button, Form, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";

const API = "https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/";

const EditExpense = (props) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    desc: "",
    category: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch existing expense data when the component mounts
    fetch(`${API}expenses/${props.expenseId}.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data>>>", data);
        setExpenseData({
          amount: data.amount,
          desc: data.desc,
          category: data.category,
        }); // Set state with fetched expense data
      })
      .catch((error) => console.error("Error fetching expense data:", error));
  }, [props.expenseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditExpense = (e) => {
    e.preventDefault();
    // Send a PUT request to update the expense data
    fetch(`${API}expenses/${props.expenseId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          console.log("Expense updated successfully");
          alert("Expense has been updated successfully");
          dispatch(
            expenseActions.editExpense({
              id: props.expenseId,
              updatedData: { ...expenseData, id: props.expenseId },
            })
          );
          props.onHideModal();
        } else {
          // Handle update failure
          console.error(
            "Failed to update expense:",
            response.status,
            response.statusText
          );
        }
      })
      .catch((error) => console.error("Error updating expense:", error));
  };

  return (
    <Modal show={true} onHide={props.onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {/* Input fields with values from state */}
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
          <Button variant="primary" onClick={handleEditExpense}>
            Edit Expense
          </Button>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExpense;
