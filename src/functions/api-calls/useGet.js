import { useDispatch } from "react-redux";
import { errorAction } from "store/error-slice";
const host = "http://localhost:5000";

const useGet = () => {
  const dispatch = useDispatch();

  const getRequest = async (path) => {
    var myHeaders = new Headers();
    const token = JSON.parse(localStorage.getItem("userData")).token;
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    let response;
    response = await fetch(host + path, {
      method: "GET",
      headers: myHeaders,
    });

    const responseData = await response.json();
    if (!(await response.ok)) {
      if (
        response &&
        responseData.message &&
        responseData.message === "JWT Expired"
      ) {
        localStorage.removeItem("userData");
      }
      const message = {message: responseData.message};
      dispatch(errorAction.setError(message));
      // throw new Error(responseData.message);
    }
    return responseData;
  };

  return getRequest;
};

export default useGet;
