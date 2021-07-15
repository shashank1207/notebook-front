import classes from './style-modules/Card.module.css';

const Card = (props) => {

  return(
    <main className={`${classes.main} ${props.className}`}>
      {props.children}
    </main>
  )
};

export default Card;