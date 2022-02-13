const host = "https://notebook-backend-shashank.herokuapp.com/";

const getRequest = async (path) => {
  var myHeaders = new Headers();
  const token = JSON.parse(localStorage.getItem("userData")).token;
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");
  let response;

  try{
    response = await fetch(host + path, {
      method: "GET",
      headers: myHeaders,
    });  
  } catch (err){
    
  }

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
