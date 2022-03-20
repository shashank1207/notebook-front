import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import classes from "./Notebook.module.css";
import { Book, Add } from "@material-ui/icons";
import underConstruct from "../../under_construction.svg";

const Notebook = () => {
  const muiClasses = makeStyles({
    icon: {
      fontSize: "36px",
      color: "#FFF",
    },
    text: {
      fontSize: "36px",
      color: "#fff",
      fontWeight: "bold",
    },
    underConstruct:{
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh'
    }
  })();
  return (
    <div className={classes.container}>
      <div className={classes["top-row"]}>
        <div style={{ flex: 1 }}>
          <ListItem>
            <ListItemIcon>
              <Book className={muiClasses.icon} />
            </ListItemIcon>
            <ListItemText
              primary="Notebooks"
              classes={{ primary: muiClasses.text }}
            />
          </ListItem>
        </div>
        <div className={classes["create-new-div"]}>
          <div className={classes["create-new"]}>
            <Add />
            Create New Notebook
          </div>
        </div>
      </div>
      <div className={muiClasses.underConstruct}>
        <img src={underConstruct} />
      </div>
    </div>
  );
};

export default Notebook;
