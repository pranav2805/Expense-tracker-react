import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import classes from "./Expense.module.css";
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";
import EditExpense from "./EditExpense";

const API_KEY = process.env.REACT_APP_API_KEY;
const API = "https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/";

const fetchExpenses = async () => {
  try {
    const resp = await fetch(
      `https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/expenses.json`
    );
    const data = await resp.json();
    let loadedExpenses = [];

    for (let key in data) {
      loadedExpenses.push({
        id: key,
        amount: data[key].amount,
        desc: data[key].desc,
        category: data[key].category,
      });
    }
    return loadedExpenses;
  } catch (err) {
    console.log(err);
  }
};
let expenseId;
const Expense = (props) => {
  const isProfileUpdated = localStorage.getItem("isProfileUpdated");
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (id) => {
    setShowModal(true);
    expenseId = id;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const verifyEmailHandler = async () => {
    const token = authCtx.token;
    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    );
    if (resp.ok) {
      alert("Verification email sent successfully");
    } else {
      console.log("something went wrong");
    }
  };

  const removeExpense = async (expenseId) => {
    try {
      const resp = await fetch(`${API}expenses/${expenseId}.json`, {
        method: "DELETE",
      });
      if (resp.ok) {
        console.log("Expense deleted!!");
        alert("Expense deleted!!");
        // Filter out the expense with the given ID and update the state
        const updatedExpenses = expenses.filter(
          (expense) => expense.id !== expenseId
        );
        setExpenses(updatedExpenses);
      }
    } catch (err) {
      console.log("Error deleting expense: ", err);
    }
  };

  useEffect(() => {
    fetchExpenses().then((expenses) => {
      setExpenses(expenses);
    });
  }, []);

  return (
    // <Modal show={showModal} onHide={handleCloseModal}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Edit Expense</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {/* Pass the expenseId to the EditExpense component */}
    //       <EditExpense expenseId={expenseId} />
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleCloseModal}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    <Fragment>
      {showModal && (
        <EditExpense expenseId={expenseId} onHideModal={handleCloseModal} />
      )}
      <div className={classes.div}>
        Welcome to Expense Tracker
        <div style={{ textAlign: "right", color: "white" }}>
          {!isProfileUpdated && (
            <p>
              <span style={{ color: "black" }}>
                Your profile is incomplete.
              </span>{" "}
              <Link to="/profile">Complete Now</Link>
            </p>
          )}
          {isProfileUpdated && (
            <p>
              <Link to="/profile">Update your profile</Link>
            </p>
          )}
          <Button type="submit" onClick={verifyEmailHandler}>
            Verify Email
          </Button>
        </div>
        <div>
          <AddExpense />
        </div>
        <div>
          <ExpensesList
            expenses={expenses}
            removeExpense={removeExpense}
            editExpense={handleEditClick}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Expense;
