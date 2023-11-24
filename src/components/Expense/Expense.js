import { Link } from "react-router-dom";

const Expense = (props) => {
  return (
    <div>
      Welcome to Expense Tracker
      <div style={{ textAlign: "right" }}>
        Your profile is incomplete. <Link to="/profile">Complete Now</Link>
      </div>
    </div>
  );
};

export default Expense;
