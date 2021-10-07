import Card from "../UI/Card";
import { TextField, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Button from "../UI/Button";
import { useCallback} from "react";
import { postReq } from "../../functions/api-calls/post-requests";
import { useDispatch, useSelector } from "react-redux";
import { signupActions } from "../../store/signup-slice";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { Link } from "react-router-dom";
import { loginActions } from "../../store/login-slices";

const SignupForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.signup.error);
  const isSignedup = useSelector((state) => state.signup.signedup);
  const history = useHistory();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordInputChangeHandler,
    inputBlurHandler: confirmPasswordInputBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value.trim().length >= 6);

  let passwordAreNotSame = false;

  if (
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredConfirmPassword !== enteredPassword
  ) {
    passwordAreNotSame = true;
  }

  let confirmPasswordError = "";

  if (passwordAreNotSame) {
    confirmPasswordError = "Passwords are not matching";
  } else if (confirmPasswordInputHasError) {
    confirmPasswordError = "Please Enter atleast 6 characters password";
  }

  let isFormValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredConfirmPassword === enteredPassword
  ) {
    isFormValid = true;
  }

  const resetForm = useCallback(() => {
    if (!error) {
      resetName();
      resetEmail();
    }
    resetPassword();
    resetConfirmPassword();
  }, [resetName, resetPassword, resetEmail, resetConfirmPassword, error]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    try {
      const response = await postReq(
        {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
        },
        "/signup"
      );
      dispatch(loginActions.setData(response));
      dispatch(signupActions.changeSignedupStatus(response));
      dispatch(signupActions.setErrors({ err: null }));
      dispatch(loginActions.switchLoginState(true));
      setTimeout(() => {
        dispatch(signupActions.changeSignedupStatus({ message: null }));
        history.replace("/app/home");
      }, 3000);
    } catch (err) {
      dispatch(signupActions.setErrors({ err: err.message }));
    }
    resetForm();
  };

  return (
    <Card
      className={`d-flex align-items-center flex-column w-100 py-2 px-md-5 px-3`}
      color='#f2f2f2'
    >
      <div className={`d-flex align-items-center flex-column m-2`}>
        <span className={`font-family-roman font-size-lg m-1`}>Sign up</span>
        <span className={`font-size-md`}>
          Please fill out details required below to continue.
        </span>
      </div>
      <form
        onSubmit={formSubmitHandler}
        className={`d-flex flex-column align-items-center justify-content-start w-100 p-2`}
      >
        <TextField
          id="name"
          label="Name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          className={`w-100 my-2`}
          error={nameInputHasError ? true : false}
          helperText={nameInputHasError ? "Please enter valid name" : ""}
        />
        <TextField
          id="email"
          label="Email"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
          className={`w-100 my-2`}
          error={emailInputHasError ? true : false}
          helperText={emailInputHasError ? "Please input valid email" : ""}
        />
        <TextField
          id="Password"
          label="Password"
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
          type="password"
          className={`w-100 my-2`}
          error={passwordInputHasError ? true : false}
          helperText={
            passwordInputHasError
              ? "Please enter atleast 6 charaters password"
              : ""
          }
        />
        <TextField
          id="confirm-password"
          label="Confirm Password"
          onChange={confirmPasswordInputChangeHandler}
          onBlur={confirmPasswordInputBlurHandler}
          value={enteredConfirmPassword}
          type="password"
          className={`w-100 my-2`}
          error={
            confirmPasswordInputHasError || passwordAreNotSame ? true : false
          }
          helperText={
            confirmPasswordInputHasError || passwordAreNotSame
              ? confirmPasswordError
              : ""
          }
        />
        {error && (
          <Alert severity="error" className="my-2">
            {error}
          </Alert>
        )}
        {isSignedup && (
          <Alert severity="success" className="my-2">
            Signed up successfully
          </Alert>
        )}
        <Button
          title="Continue"
          color="#fff"
          bg-color="#00a82d"
          type="submit"
          className={`font-weight-bold w-md-75 mt-2 mw-200`}
        />
      </form>
      <Divider variant="middle" />
      <span className="font-family-roman">
        Already an user? <Link to="/login">Login</Link>
      </span>
    </Card>
  );
};

export default SignupForm;
