import { Navbar, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const NavBarHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.expense.total);
  let activatePremium = total > 10000;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        {isLoggedIn && (
          <div>
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        )}
        {isLoggedIn && activatePremium && (
          <div>
            <Button>Activate Premium</Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBarHeader;
