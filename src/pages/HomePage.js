import { useDispatch } from "react-redux";
import Button from "../components/UI/Button";
import { loginActions } from "../store/login-slices";

const HomePage = () => {
  const dispatch = useDispatch();

  const buttonClickHandler = () => {
    dispatch(loginActions.switchLoginState(false));
    localStorage.removeItem('userData');
  }

  return (
    <div><Button onClick={buttonClickHandler}>Logout</Button></div>
  )
};

export default HomePage;