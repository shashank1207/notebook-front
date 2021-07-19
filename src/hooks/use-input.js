import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredInputValue, setEnteredInputValue] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);

  let enteredValue = enteredInputValue;
  let isTouched = isInputTouched;
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredInputValue(event.target.value);
  };

  const inputFocusHandler = (event) => {
    setIsInputInFocus(true);
  }

  const inputBlurHandler = () => {
    setIsInputTouched(true);
    setIsInputInFocus(false);
  };

  const reset = () => {
    setEnteredInputValue('');
    setIsInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    isInputInFocus,
    inputFocusHandler,
    reset,
  };
};

export default useInput;