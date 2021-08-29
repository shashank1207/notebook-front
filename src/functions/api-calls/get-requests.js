const host = "http://localhost:5000";

const getRequest = async (path) => {
  var myHeaders = new Headers();
  const token = JSON.parse(localStorage.getItem("userData")).token;
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  const response = await fetch(host + path, {
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
    throw new Error(responseData.message);
  }
  return responseData;
};

export default getRequest;
