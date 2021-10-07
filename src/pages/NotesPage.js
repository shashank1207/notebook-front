import { makeStyles } from "@material-ui/core";
import NotesBar from "components/Notes/NotesBar";
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotePage from "./NotePage";

const NotesPage = () => {
  const [canProceed, setCanProceed] =  useState(true);
  const {path} = useRouteMatch();
  const useStyles = makeStyles({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      color: "#fff",
      minWidth: 'calc(100%-280px)',
      "& > *": {
        color: "#FFF",
      },
    },
    text:{
      color: "#fff",
    }

  });

  const classes = useStyles();
  return (
    <div className={`home-main d-flex ${classes.container}`}>
      <NotesBar canProceed={canProceed} />
      <Switch>
        <Route path={`${path}/note/:note_id`}>
          <NotePage setCanProceed={setCanProceed} />
        </Route>
      </Switch>
    </div>
  );
};

export default NotesPage;
