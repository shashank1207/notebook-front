import "./App.css";
import "./Global.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { loginActions } from "./store/login-slices";
import NotesPage from "./pages/NotesPage";
import EntryPage from "./pages/EntryPage";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    const time = +new Date();
    const timeData = JSON.parse(localStorage.getItem("userData")).time;
    const duration = time - timeData;
    if (duration > 18000000) {
      dispatch(loginActions.switchLoginState(false));
      localStorage.removeItem("userData");
    }
  }

  return (
    <div className={`app`}>
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn ? <Redirect to="/welcome" /> : <Redirect to="/app/home" />}
        </Route>
        <Route path="/welcome" exact>
          {isLoggedIn ? <Redirect to="/app/home" /> : <WelcomePage />}
        </Route>
        <Route path="/app">
          {!isLoggedIn ? <Redirect to="/welcome" /> : <EntryPage />}
        </Route>
        <Route path="/notes">
          <NotesPage />
        </Route>
        <Route path="/signup">
          {isLoggedIn ? <Redirect to="/app/home" /> : <SignupPage />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/app/home" /> : <LoginPage />}
        </Route>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
