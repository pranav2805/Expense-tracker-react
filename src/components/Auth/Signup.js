import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import classes from "./Signup.module.css";
import "./FloatingPlaceholderForm.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const postUser = async (user) => {
  const resp = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (resp.ok) {
    alert("user created successfully");
  } else {
    const data = await resp.json();
    // console.log(data);
    let errorMessage = "Authentication Failed!!";
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    alert(errorMessage);
  }
};

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    // Add your validation logic here
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    const isConfirmPasswordValid =
      formData.password === formData.confirmPassword;
    // console.log("Confirm>>", formData.confirmPassword);
    setIsValid(isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }, [formData]);

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("value>>>", value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // console.log("formData>>", formData);
    // validateForm();
  };

  useEffect(() => {
    validateForm();
  }, [validateForm, formData]);

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
      // Add your signup logic here, such as making an API request
      // console.log(formData);
      setIsLoading(true);
      await postUser({ email: formData.email, password: formData.password });
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes["blue-background"]}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className={classes.card}>
          <Card.Title className={classes.title}>SignUp</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="floating-label">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  // placeholder="Email address"
                  name="email"
                  value={formData.email}
                  // onChange={(e) => {
                  //   handleChange(e);
                  //   validateForm();
                  // }
                  // }
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                className="floating-label"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  // placeholder="Password"
                  name="password"
                  value={formData.password}
                  // onChange={(e) => {
                  //   handleChange(e);
                  //   // validateForm();
                  // }}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicConfirmPassword"
                className="floating-label"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  // placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  // onChange={(e) => {
                  //   handleChange(e);
                  //   // validateForm();
                  // }}
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
                  Sign Up
                </Button>
              )}
              {isLoading && <p>Loading...</p>}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
