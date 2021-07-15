var host = "http://localhost:5000";

export const postReq = async (userdata, path) => {
  const response = await fetch(host + path, {
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
