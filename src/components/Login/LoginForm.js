import { useCallback, useEffect } from "react";
import Card from "../UI/Card";
import { TextField, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { postReq } from "../../functions/api-calls/post-requests";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slices";
import { useHistory } from "react-router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const loading = useSelector((state) => state.login.loading);
  const history = useHistory();

  const {
    valueChangeHandler: emailInputChangeHandler,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    value: enteredEmail,
    inputBlurHandler: emailInputBlurHandler,
    isInputInFocus: isEmailInputInFocus,
    inputFocusHandler: emailInputFocusHandler,
    reset: resetEmail,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    inputFocusHandler: passwordInputFocusHandler,
    isInputInFocus: isPasswordInputInFocus,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);

  useEffect(() => {
    if (isEmailInputInFocus) {
      dispatch(loginActions.setErrors({ err: null }));
    }
  }, [isEmailInputInFocus, isPasswordInputInFocus, dispatch]);

  const resetForm = useCallback(() => {
    if (!error) {
      resetEmail();
    }
    resetPassword();
  }, [resetPassword, resetEmail, error]);

  let isFormValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isFormValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(loginActions.setloading(true));
    if (!isFormValid) {
      return;
    }
    try {
      const response = await postReq(
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        "/login"
      );
      dispatch(loginActions.setData(response));

      setTimeout(() => {
        history.replace("/home");
        dispatch(loginActions.switchLoginState(true));
      }, 1000);
    } catch (err) {
      dispatch(loginActions.setErrors({ err: err.message }));
    }
    dispatch(loginActions.setloading(false));
    resetForm();
  };

  return (
    <Card>
      <div
        className={`d-flex align-items-center flex-column m-2 py-2 px-md-5 px-3`}
      >
        <span className={`font-family-roman font-size-lg m-1`}>Login</span>

        <span className={`font-size-md`}>Please enter your credentials</span>
      </div>
      <form onSubmit={formSubmitHandler}>
        <TextField
          id="email"
          label="Email"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
          className={`w-100 my-2`}
          onFocus={emailInputFocusHandler}
          error={emailInputHasError ? true : false}
          helperText={emailInputHasError ? "Please input valid email" : ""}
        />
        <TextField
          id="Password"
          label="Password"
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
          onFocus={passwordInputFocusHandler}
          type="password"
          className={`w-100 my-2`}
          error={passwordInputHasError ? true : false}
          helperText={
            passwordInputHasError
              ? "Please enter atleast 6 charaters password"
              : ""
          }
        />
        <Button
          color="#fff"
          bg-color="#00a82d"
          type="submit"
          className={`font-weight-bold w-md-75 mt-3 mw-200`}
        >
          {!loading ? "Login" : <CircularProgress />}
        </Button>

        {error && (
          <Alert severity="error" className="my-2">
            {error}
          </Alert>
        )}
        {isLoggedIn && (
          <Alert severity="success" className="my-2">
            Logged-in successfully
          </Alert>
        )}
      </form>
    </Card>
  );
};

export default LoginForm;
