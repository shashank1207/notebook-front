import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredInputValue, setEnteredInputValue] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  let enteredValue = enteredInputValue;
  let isTouched = isInputTouched;
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsInputTouched(true);
  };

  const reset = () => {
    setIsInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;