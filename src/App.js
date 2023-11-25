import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment, Suspense, useContext } from "react";
import ExpensePage from "./pages/ExpensePage";
import Profile from "./components/Profile/Profile";
import NavBarHeader from "./components/Navigation/NavBarHeader";
import AuthContext from "./store/auth-context";
import ForgetPassword from "./components/Auth/ForgetPassword";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      {authCtx.isLoggedIn && <NavBarHeader />}
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<p>Loading...</p>}>
            <Signup />
          </Suspense>
        </Route>
        <Route path="/signup">
          <Suspense fallback={<p>Loading...</p>}>
            <Signup />
          </Suspense>
        </Route>
        <Route path="/login">
          <Suspense fallback={<p>Loading...</p>}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/forgetPassword">
          <Suspense fallback={<p>Loading...</p>}>
            <ForgetPassword />
          </Suspense>
        </Route>
        <Route path="/expense">
          <Suspense fallback={<p>Loading...</p>}>
            {authCtx.isLoggedIn && <ExpensePage />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Suspense>
        </Route>
        <Route path="/profile">
          <Suspense fallback={<p>Loading...</p>}>
            {authCtx.isLoggedIn && <Profile />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Suspense>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
