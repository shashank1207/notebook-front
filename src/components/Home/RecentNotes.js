import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardMui, makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";

// import Card from "../UI/Card";
// import getRequest from "functions/api-calls/get-requests";
import { notesAction } from "store/notes-slice";
// import { postReq } from "functions/api-calls/post-requests";
import useGet from "functions/api-calls/useGet";
// import useNotes from "functions/notes/NotesFunctions";
import usePost from "functions/api-calls/usePost";

const RecentNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [editorState] = useState(EditorState.createEmpty());
  const getRequest = useGet();
  const postReq = usePost();

  const useStyles = makeStyles({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      "$ > *": {
        color: "#FFF",
      },
    },
    card: {
      backgroundColor: "#1a1a1a",
      width: "95%",
      height: "358px",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      padding: "12px 20px",
      minWidth: "300px",
      borderRadius: "12px",
    },
    notes_heading: {
      color: "#4aa92f",
      fontWeight: 600,
      width: "auto",
      margin: "12px 0",
    },
    notes_row: {
      display: "flex",
      overflow: "hidden",
    },
    note: {
      backgroundColor: "#262626",
      maxHeight: "262px",
      height: "252px",
      width: "172px",
      // width: "calc(14%)",
      margin: "0 12px 0 0",
      padding: "12px",
      minWidth: "10%",
      boxShadow: "0px 0px 6px 3px rgba(0,0,0,0.57)",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    title: {
      fontWeight: "bold",
      marginBottom: "4px",
      color: "#fff",
      fontSize: "14px",
      flex: 1,
    },
    created: {
      fontWeight: 500,
      marginBottom: "4px",
      color: "#fff",
      fontSize: "14px",
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
    },
    noteText: {
      color: "#fff",
      fontSize: "14px",
      wordWrap: "break-word",
      position: "relative",
      overflow: "hidden",
      hyphens: "auto",
      flex: 7,
    },
    newNote: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    add_icon: {
      color: "#4aa92f",
      fontSize: "60px",
      flex: 1,
    },
    svgCont: {
      flex: 1,
      display: "flex",
      alignItems: "flex-end",
    },
  });

  const classes = useStyles();

  const getNotes = useCallback(async () => {
    let notesA = [];
    try {
      notesA = await getRequest("/get-recent-notes");
      for (const i in notesA.notes){
        if(notesA.notes[i].note){
          notesA.notes[i].note = convertFromRaw(JSON.parse(notesA.notes[i].note)).getPlainText();
        }
      };
      dispatch(notesAction.setNotes(notesA));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const openNewNote = async () => {
    try {
      const n = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      const response = await postReq({note: n}, "/add");
      const note = convertFromRaw(await JSON.parse(n)).getPlainText();
      dispatch(
        notesAction.addNote({
          _id: response._id,
          note: note,
          title: response.title,
        })
      );
    } catch (err) {
      console.log(err);
      <div>
        {err}
      </div>
    }
  };

  const notesMap = notes.length && notes.map((note) => {
    return (
      <Link to={`/app/notes/note/${note._id}`} key={note._id}>
        <CardMui className={`${classes.note}`} >
          <div className={`${classes.title}`}>{note.title}</div>
          <div className={`${classes.noteText} line-clamp`}>{note.note}</div>
          <div className={`${classes.created}`}>{note.created}</div>
        </CardMui>
      </Link>
    );
  });

  return (
    <CardMui className={`m-0 ${classes.card} align-content-center mt-5`}>
      <span className={classes.notes_heading}>Recent Notes &#62;</span>
      <div className={classes.notes_row}>
        {notes.length ? notesMap : null}
        <CardMui
          className={`${classes.note} ${classes.newNote}`}
          onClick={openNewNote}
        >
          <div className={`align-items-end ${classes.svgCont}`}>
            <AddCircle className={classes.add_icon} />
          </div>
          <p className={`${classes.title}`}>Create New Note</p>
        </CardMui>
      </div>
    </CardMui>
  );
};

export default RecentNotes;
