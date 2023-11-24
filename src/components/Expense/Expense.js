import { Link } from "react-router-dom";

const Expense = (props) => {
  const isProfileUpdated = localStorage.getItem("isProfileUpdated");
  return (
    <div>
      Welcome to Expense Tracker
      <div style={{ textAlign: "right" }}>
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
      </div>
    </div>
  );
};

export default Expense;
