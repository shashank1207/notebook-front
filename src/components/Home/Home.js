import { makeStyles } from "@material-ui/core";
import ScratchPad from "./ScratchPad";

import RecentNotes from "./RecentNotes";
// import useNotes from "../../functions/notes/NotesFunctions";

const Home = () => {

  const useStyles = makeStyles({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      "$ > *": {
        color: "#FFF",
      },
    }
  });

  const classes = useStyles();

  return (
    <div className={`home-main d-flex ${classes.container}`}>
      <RecentNotes />
      <ScratchPad />
    </div>
  );
};

export default Home;
