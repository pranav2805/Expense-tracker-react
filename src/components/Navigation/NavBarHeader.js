import { Navbar, Container, Button } from "react-bootstrap";

const NavBarHeader = (props) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        <Navbar.Collapse>
          <NavLink></NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
