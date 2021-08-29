import styles from "./style-modules/Button.module.css";
import PropsTypes from "prop-types";

const Button = (props) => {
  const classes = props.className;
  return (
    <button
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      className={`${classes} ${styles.button} font-family-roman font-size-md `}
      style={{
        backgroundColor: props["bg-color"],
        color: props.color,
        width: props.width,
        borderRadius: props.borderRadius,
        border: props.border,
      }}
    >
      {props.children ? props.children : props.title}
    </button>
  );
};

Button.propTypes = {
  onClick: PropsTypes.func,
  type: PropsTypes.string,
};

export default Button;
