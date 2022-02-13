import { loginActions } from "store/login-slices";

const host = "https://notebook-backend-shashank.herokuapp.com/";

export const postReq = async (data, path, dispatch) => {
  var myHeaders = new Headers();
  let userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = JSON.stringify(data);
  myHeaders.append("Content-Type", "application/json");
  const response = await fetch(host + path, {
    method: "POST",
    body: raw,
    headers: myHeaders,
  });

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
    throw new Error(responseData.message);
  }
  if (!(await response.ok)) {
    throw new Error(responseData.message);
  }
  return responseData;
};
