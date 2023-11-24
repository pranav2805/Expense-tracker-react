import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import ExpensePage from "./pages/ExpensePage";

function App() {
  return (
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
      <Route path="/expense">
        <Suspense fallback={<p>Loading...</p>}>
          <ExpensePage />
        </Suspense>
      </Route>
    </Switch>
  );
}

export default App;
