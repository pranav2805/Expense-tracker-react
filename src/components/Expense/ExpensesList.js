import React, { useState } from "react";
import { Table, Container, Card } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  // Sample expenses data for demonstration
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 50, desc: "Groceries", category: "Food" },
    { id: 2, amount: 30, desc: "Movie tickets", category: "Entertainment" },
    { id: 3, amount: 20, desc: "Transportation", category: "Travel" },
  ]);

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Card style={{ width: "80%", marginTop: "3%" }}>
        <Card.Body>
          <Table borderless hover>
            <thead>
              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                // <tr key={expense.id}>
                //   <td>{expense.amount}</td>
                //   <td>{expense.desc}</td>
                //   <td>{expense.category}</td>
                // </tr>
                <ExpenseItem
                  key={expense.id}
                  id={expense.id}
                  amount={expense.amount}
                  desc={expense.desc}
                  category={expense.category}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpensesList;
