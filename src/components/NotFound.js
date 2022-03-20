import ErrMes from "404.svg";
import { makeStyles } from "@material-ui/core";

const NotFound = () => {

  const classes = makeStyles({
    NotFound:{
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh'
    }
  })();
  return (
    <div className={classes.NotFound}>
      <img src={ErrMes} style={{ height: "70%", width: "calc(100vw - 240px)" }} />
    </div>
  );
};

export default NotFound;