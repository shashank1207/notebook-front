import "./App.css";
import "./Global.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";

function App() {
  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <Switch>
      <Route path="/" exact>
        {!isLoggedIn ? <Redirect to="/welcome" /> : <Redirect to="/home" />}
      </Route>
      <Route path="/welcome" exact>
        <WelcomePage />
      </Route>
      <Route path="/home">
        {!isLoggedIn ? <Redirect to="/login" /> : <HomePage />}
      </Route>
      <Route path="/signup">{isLoggedIn ? <Redirect to="/home" />: <SignupPage />}</Route>
      <Route path="/login">{isLoggedIn && <Redirect to="/home" />}</Route>
      <Route path="*">
        <div>Not found</div>
      </Route>
    </Switch>
  );
}

export default App;
