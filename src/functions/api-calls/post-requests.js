var host = "http://localhost:5000";

export const signupReq = async (userdata) => {
  const response = await fetch(host + "/signup", {
    method: "POST",
    body: JSON.stringify(userdata),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (!await response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
};
