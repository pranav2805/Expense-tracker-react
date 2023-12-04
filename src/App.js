import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment, Suspense, useContext } from "react";
import ExpensePage from "./pages/ExpensePage";
import Profile from "./components/Profile/Profile";
import NavBarHeader from "./components/Navigation/NavBarHeader";
import AuthContext from "./store/auth-context";
import { useSelector } from "react-redux";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Premium from "./components/Premium/Premium";

function App() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log("isloggedin>>", isLoggedIn);
  const total = useSelector((state) => state.expense.total);
  // console.log("total>>>", total);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      {isLoggedIn && <NavBarHeader />}
      {/* {isLoggedIn && <Redirect to="/expense" />} */}
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
            {isLoggedIn && <ExpensePage />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Suspense>
        </Route>
        <Route path="/profile">
          <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn && <Profile />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Suspense>
        </Route>
        <Route path="/premium">
          <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn && <Premium />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
