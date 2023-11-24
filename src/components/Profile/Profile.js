import { Button, Card, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../../store/auth-context";

const API_KEY = process.env.REACT_APP_API_KEY;

const Profile = (props) => {
  //   const nameRef = useRef();
  //   const photoRef = useRef();
  const [profileData, setProfileData] = useState({
    name: "",
    photoUrl: "",
  });

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (!initialDataLoaded) {
          console.log("data>>>", data);
          const user = data.users[0];
          setProfileData({
            name: user.displayName || "",
            photoUrl: user.photoUrl || "",
          });
          setInitialDataLoaded(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameInput = profileData.name;
    const photoInput = profileData.photoUrl;
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
        localStorage.setItem("isProfileUpdated", 1);
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
              <Form.Control
                type="text"
                value={profileData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo url</Form.Label>
              <Form.Control
                type="text"
                value={profileData.photoUrl}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
