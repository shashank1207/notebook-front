import { useCallback } from "react";
import Card from "../UI/Card";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { postReq } from "../../functions/api-calls/post-requests";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slices";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error_login);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const {
    valueChangeHandler: emailInputChangeHandler,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    value: enteredEmail,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);

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

  const formSubmitHandler =async (event) => {
    event.preventDefault();

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
      console.log(response);
    } catch (err) {
      dispatch(loginActions.setErrors({ err: err.message }));
    }
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
        <Button
          title="Login"
          color="#fff"
          bg-color="#00a82d"
          type="submit"
          className={`font-weight-bold w-md-75 mt-3 mw-200`}
        />

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
