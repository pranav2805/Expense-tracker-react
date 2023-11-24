import { Form, Button, Card } from "react-bootstrap";
import classes from "./Signup.module.css";
import "./FloatingPlaceholderForm.css";
import { useState, useEffect, useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link, useHistory } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const validateForm = useCallback(() => {
    // Add your validation logic here
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    setIsValid(isEmailValid && isPasswordValid);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [validateForm, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await resp.json();
      if (resp.ok) {
        authCtx.login(data.idToken, data.email);
        alert("Logged in successfully");
        history.replace("/expense");
      } else {
        let errorMessage = "Login Failed!!";
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

  return (
    <div className={classes["blue-background"]}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className={classes.card}>
          <Card.Title className={classes.title}>Login</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="floating-label">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  // placeholder="Email address"
                  name="email"
                  value={formData.email}
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
                  Login
                </Button>
              )}
              {isLoading && <p>Loading...</p>}
            </Form>
            <div className={classes.div}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
