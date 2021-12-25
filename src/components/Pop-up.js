import reactDom from "react-dom";
import { makeStyles } from "@material-ui/core";
import classes from './Pop-up.module.css';
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { errorAction } from "store/error-slice";
import { useState } from "react";
// import {Logout} from "fon"

const PopUp = () => {
  const message = useSelector((state) => state.error.message);
  const [revoking, setRevoking] = useState(false);

  const dispatch = useDispatch();

  const revokeError = async () => {
    await setRevoking(true);
    dispatch(errorAction.revokeError());
    // setTimeout(() => {
    //   dispatch(errorAction.revokeError());
    // }, 3000);
    setRevoking(false);
  };


  return (
    <div className={classes.main}>
        <div className={`${classes.container} ${!revoking ? classes.inserting: classes.removing}`}>
          {message}
        <div onClick={revokeError} className={classes.close}>
          <Close />
        </div>
        </div>
    </div>
  )
}

const ErrorPopup = () => {
  return (
    <Fragment>
      {reactDom.createPortal(<PopUp />, document.getElementById('error-popup'))}
    </Fragment>
  )
};

export default ErrorPopup;
