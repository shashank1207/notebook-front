import { loginActions } from "store/login-slices";
import { useDispatch } from "react-redux";
import { errorAction } from "store/error-slice";

const host = "http://localhost:5000";

const usePost = () => {
  const dispatch = useDispatch();

  const postReq = async (data, path, type) => {
    var myHeaders = new Headers();
    let userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;
    myHeaders.append("Authorization", "Bearer " + token);
    const raw = JSON.stringify(data);
    myHeaders.append("Content-Type", type ? type : "application/json");
    let response;
    try{
      response = await fetch(host + path, {
        method: "POST",
        body: raw,
        headers: myHeaders,
      });
    } catch(err){
      dispatch(errorAction.setError({message: err.message}));
    }
  
    const responseData = await response.json();
    if (
      response &&
      responseData.message &&
      responseData.message === "JWT Expired"
    ) {
      localStorage.removeItem("userData");
      if (dispatch){
        dispatch(loginActions.deleteUserData());
        dispatch(loginActions.switchLoginState(false));
      }
      dispatch(errorAction.setError({message: responseData.message}));
      // throw new Error(responseData.message);
    }
    if (!(await response.ok)) {
      dispatch(errorAction.setError({message: responseData.message}));
      // throw new Error(responseData.message);
    }
    return responseData;
  };

  return postReq;
}

export default usePost;
