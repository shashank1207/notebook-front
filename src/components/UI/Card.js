import classes from './style-modules/Card.module.css';
import { makeStyles } from '@material-ui/core';
import PropsTypes from "prop-types";

const Card = (props) => {
  const newStyles = makeStyles({
    color: {
      backgroundColor: props.color
    }
  });

  const styles = newStyles();
  return(
    <main style={props.style} className={`${classes.main} ${props.className} ${styles.color}`}>
      {props.children}
    </main>
  )
};

Card.propTypes = {
  color: PropsTypes.string,
  className: PropsTypes.string,
  style: PropsTypes.object
}

export default Card;