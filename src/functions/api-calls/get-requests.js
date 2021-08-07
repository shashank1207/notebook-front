const host = "http://localhost:5000";

const getRequest = async (path, auth) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + auth
  );
  myHeaders.append("Content-Type", "application/json");
  const response = await fetch(host + path, {
    method: "GET",
    headers: myHeaders,
  });

  const responseData = await response.json();
  if (!(await response.ok)) {
    throw new Error(responseData.message);
  }
  return responseData;
};

export default getRequest;