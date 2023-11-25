import { Button } from "react-bootstrap";

const ExpenseItem = (props) => {
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <tr key={props.id} style={{ borderBottom: "1px solid #dee2e6" }}>
      <td>{props.amount}</td>
      <td>{props.desc}</td>
      <td>{props.category}</td>
      <td>
        <Button variant="warning" onClick={() => handleEdit(props.id)}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => handleDelete(props.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
