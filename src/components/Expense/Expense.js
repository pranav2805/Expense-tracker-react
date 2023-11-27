import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import classes from "./Expense.module.css";
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";

const API_KEY = process.env.REACT_APP_API_KEY;

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

const Expense = (props) => {
  const isProfileUpdated = localStorage.getItem("isProfileUpdated");
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

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

  useEffect(() => {
    fetchExpenses().then((expenses) => {
      setExpenses(expenses);
    });
  }, []);

  return (
    <div className={classes.div}>
      Welcome to Expense Tracker
      <div style={{ textAlign: "right", color: "white" }}>
        {!isProfileUpdated && (
          <p>
            Your profile is incomplete. <Link to="/profile">Complete Now</Link>
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
        <ExpensesList expenses={expenses} />
      </div>
    </div>
  );
};

export default Expense;
