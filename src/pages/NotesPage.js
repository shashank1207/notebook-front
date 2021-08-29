import { makeStyles } from "@material-ui/core";
import NotesBar from "components/Notes/NotesBar";
import { Fragment } from "react";

const NotesPage = () => {
  const useStyles = makeStyles({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      color: "#fff",
      "$ > *": {
        color: "#FFF",
      },
    },
  });

  const classes = useStyles();
  return <div className={`home-main d-flex ${classes.container}`}>
    <NotesBar />
  </div>;
};

export default NotesPage;
