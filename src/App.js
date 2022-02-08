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
import NotFound from "components/NotFound";
import ErrorPopup from "components/Pop-up";
// import useGet from "functions/api-calls/useGet";
import { useEffect } from "react";
import usePost from "functions/api-calls/usePost";


function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const hasError = useSelector((state) => state.error.hasError)
  const dispatch = useDispatch();

  // const postReq = usePost();

  // const getError = async() => {
  //   const res  = await postReq({},'/error');
  // };

  // useEffect(()=> {
  //   getError();
  // }, []);

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
      {hasError && <ErrorPopup />}
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn ? (
            <Redirect to="/welcome" />
          ) : (
            <Redirect to="/app/home" />
          )}
        </Route>
        <Route path="/welcome" exact>
          {isLoggedIn ? <Redirect to="/app/home" /> : <WelcomePage />}
        </Route>
        <Route path="/app">
          {!isLoggedIn ? <Redirect to="/welcome" /> : <EntryPage />}
        </Route>
        {/* <Route path="/notes">
          <NotesPage />
        </Route> */}
        <Route path="/signup">
          {isLoggedIn ? <Redirect to="/app/home" /> : <SignupPage />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/app/home" /> : <LoginPage />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
