import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/theme";
import "./Premium.css";
import { Fragment } from "react";
import { Button } from "react-bootstrap";

const Premium = (props) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const handleThemeToggle = () => {
    dispatch(themeActions.toggle());
  };

  const expenses = useSelector((state) => state.expense.expenses);
  function transformArr() {
    const expArr = expenses.map((expense) => {
      const [, ...values] = Object.values(expense);
      return values;
    });
    // console.log(expArr);
    expArr.unshift(["Price", "Description", "Category"]);
    return expArr.map((e) => e.join(",")).join("\n");
  }

  function downloadHandler() {
    const blob = new Blob([transformArr()]);
    const link = document.createElement("a");

    link.download = "expenseData.csv";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }

  return (
    <Fragment>
      <button style={{ marginTop: "10%" }} onClick={handleThemeToggle}>
        Toggle Theme ({isDarkTheme ? "Dark" : "Light"})
      </button>
      <Button onClick={downloadHandler}>Download File </Button>
    </Fragment>
  );
};

export default Premium;
