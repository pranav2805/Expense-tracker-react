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
        console.log("data>>>", data);
        const user = data.users[0];
        setProfileData({
          name: user.displayName || "",
          photoUrl: user.photoUrl || "",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setProfileData((prevData) => ({ ...prevData, [name]: value }));
  //   };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setProfileData((prevData) => ({ ...prevData, name: value }));
  };

  const handlePhotoUrlChange = (e) => {
    const { value } = e.target;
    setProfileData((prevData) => ({ ...prevData, photoUrl: value }));
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
            displayName: nameInput.trim(),
            photoUrl: photoInput.trim(),
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
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Photo url</Form.Label>
              <Form.Control
                type="text"
                value={profileData.photoUrl}
                onChange={handlePhotoUrlChange}
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
