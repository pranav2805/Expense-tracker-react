import { Navbar, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const NavBarHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        {authCtx.isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
};

export default NavBarHeader;
