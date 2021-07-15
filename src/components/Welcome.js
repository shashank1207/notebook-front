import Button from "./UI/Button";
import { useHistory } from "react-router-dom";

const Welcome = (props) => {
  const classes = props.className;
  const history = useHistory();

  const onLoginClick = () => {
    history.push('/login');
  };

  const onSignupClick = () => {
    history.push('/signup');
  }

  return (
    <div
      className={`${classes} d-flex align-items-center justify-content-center`}
    >
      <span className={`font-family-roman font-size-lgr font-weight-bold`}>
        Get Started
      </span>
      <div className={`d-flex flex-column-sm justify-content-center align-items-center w-auto`}>
        <Button title="Login" onClick={onLoginClick} color='#000' className={`font-weight-bold w-md-75`} />
        <Button title="Sign-up" onClick={onSignupClick} color='#fff' bg-color='#00a82d' className={`font-weight-bold w-md-75`} />
      </div>
    </div>
  );
};

export default Welcome;
