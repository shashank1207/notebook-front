import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { loginActions } from "../../store/login-slices";
import { postReq } from "../../functions/api-calls/post-requests";

const Home = () => {
  const dispatch = useDispatch();
  const [note, setNote] = useState();

  const buttonClickHandler = () => {
    dispatch(loginActions.switchLoginState(false));
    localStorage.removeItem("userData");
  };

  const inputChangeHandler = async (event) => {
    setNote(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("userData")).token;
    try {
      const response = await postReq({ note: note }, "/add", token);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={buttonClickHandler}>Logout</Button>
      <form onSubmit={submitHandler}>
        <input name="note" onChange={inputChangeHandler} />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Home;
