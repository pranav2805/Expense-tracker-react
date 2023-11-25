import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";
import "./FloatingPlaceholderForm.css";
import { useEffect, useState, useCallback } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const validateEmail = useCallback(() => {
    // Add your validation logic here
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(isEmailValid);
  }, [email]);

  const handleFocus = (e) => {
    e.target.parentElement.classList.add("focused");
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      e.target.parentElement.classList.remove("focused");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(formData);
      setIsLoading(true);
      const resp = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await resp.json();
      if (resp.ok) {
        alert("Reset password link sent to your email");
        setIsValid(false);
      } else {
        let errorMessage = "Something went wrong!!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    validateEmail();
  }, [validateEmail, email]);

  return (
    <div className={classes["blue-background"]}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className={classes.card}>
          <Card.Title className={classes.title}>Reset Password</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="floating-label">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  // placeholder="Email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Form.Group>
              {!isLoading && (
                <Button
                  variant="primary"
                  type="submit"
                  block
                  disabled={!isValid}
                >
                  Submit
                </Button>
              )}
              {isLoading && <p>Loading...</p>}
              <div>
                <Link to="/login">Go to login page</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPassword;
