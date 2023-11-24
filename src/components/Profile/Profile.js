import { Button, Card, Form } from "react-bootstrap";
import { useRef, useContext } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../../store/auth-context";

const API_KEY = process.env.REACT_APP_API_KEY;

const Profile = (props) => {
  const nameRef = useRef();
  const photoRef = useRef();

  const authCtx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameInput = nameRef.current.value;
    const photoInput = photoRef.current.value;
    const token = authCtx.token;
    console.log("token>>", typeof token);
    if (nameInput.trim().length > 0 && photoInput.trim().length > 0) {
      const resp = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: nameInput,
            photoUrl: photoInput,
            returnSecureToken: true,
          }),
        }
      );

      if (resp.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Something wnet wrong!!");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className={classes.card}>
        <Card.Title className={classes.title}>Profile Details</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" ref={nameRef}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo url</Form.Label>
              <Form.Control type="text" ref={photoRef}></Form.Control>
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
