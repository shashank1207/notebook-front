import Home from "../components/Home/Home";
import Sidebar from "../components/UI/Sidebar";
import { useCallback, useEffect } from "react";

import getRequest from "../functions/api-calls/get-requests";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slices";

const HomePage = () => {

  const dispatch = useDispatch();

  const getUser = useCallback(async() => {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    try{
      const user = await getRequest('/get-user', token);
      dispatch(loginActions.setUser({user: user}));
    }
    catch(err){

    }
  }, [dispatch])

  useEffect(()=> {
    getUser();
  }, [getUser])

  return (
    <div className={`d-flex position-absolute`}>
        <Sidebar />
        <Home />
    </div>
  );
};

export default HomePage;
