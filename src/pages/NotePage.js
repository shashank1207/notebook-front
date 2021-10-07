import { Divider, makeStyles } from "@material-ui/core";
import getRequest from "functions/api-calls/get-requests";
import { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Book, MoreHoriz } from "@material-ui/icons";
import { EditorState, Editor, ContentState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

import Button from "components/UI/Button";
// import Editor from "components/Editor/Editor";
import { useRef } from "react";
import { postReq } from "functions/api-calls/post-requests";
import { useDispatch, useSelector } from "react-redux";
import { notesAction } from "store/notes-slice";

const NotePage = (props) => {
  const { params } = useRouteMatch();
  const [note, setNote] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const allNotes = useSelector((state) => state.notes.allNotes);
  const dispatch = useDispatch();

  const noteRef = useRef(note);
  const classes = makeStyles({
    body: {
      display: "flex",
      width: "calc(100% - 280px)",
      backgroundColor: "#262626",
      padding: "12px",
      flexDirection: "column",
      minWidth: 'calc(100%-280px)',
      overflowY:'scroll',
      minHeight:'100%'
    },
    upperPart: {
      display: "flex",
      height: "auto",
      width: "100%",
      justifyContent: "flex-start",
      maxHeight: "30px",
    },
    leftUpper: {
      display: "flex",
      flex: 1,
    },
    rightUpper: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
    },
    expandArrow: {
      fontSize: "20px",
      margin: "0 10px 0 0",
    },
    verDivider: {
      backgroundColor: "#cccccc",
      margin: "0 0 0 10px",
    },
    notebook: {
      margin: "0 0 0 10px",
      display: "flex",
      fontSize: "16px",
    },
    bookIcon: {
      fontSize: "20px",
    },
    text: {
      maxHeight: "20px",
      display: "flex",
      fontSize: "16px",
      alignItems: "center",
      margin: "0 4px",
    },
    button: {
      backgroundColor: "#4AA92F",
      height: "auto",
      margin: "0 20px 0 20px",
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
    },
    ellipsis: {
      fontSize: "24px",
      margin: "0 20px 0 0",
      fontWeight: "400",
    },
    inputEditor: {
      backgroundColor: "#262626",
      color: "#fff",
      outline: "none",
      border: "none",
      resize: "none",
      // textAlign: 'start'
    },
    inputDiv: {
      minHeight:'100%',
      height: "auto",
      padding: '12px'
    },
    title:{
      fontSize: '32px',
      fontWeight: 'bolder',
      minWidth: '32px',
      width:'100%',
      padding: '8px 8px 8px 0px',
      outline: 'none'
    }
  })();

  const getNote = useCallback(async () => {
    props.setCanProceed(false);
    const response = await getRequest(`/get-note?id=${params.note_id}`);
    setNote(response.note);
    const p = convertFromRaw(JSON.parse(response.note.note));
    const state = EditorState.createWithContent(p);
    setEditorState(state);
    props.setCanProceed(true);
  }, [params.note_id]);

  // const dispatchNote = (value) => {
  //   if(params.note_id !== value.note_id){
  //     return;
  //   }
  //   try {
  //     dispatch(notesAction.updateNote({_id: params.note_id, note: value}));
  //     let v = note;
  //     v.note = value;
  //     setNote(v);
  //   } catch (err) {}
  // };

  // const updateNote = () => {
  //   try {
  //     const noteO = {
  //       noteId: params.note_id,
  //       note: noteRef.current.value
  //     };
  //     dispatch(notesAction.updateNote({_id: params.note_id, note: noteRef.current.value}));
  //     const newNote = {...note, note: noteRef.current.value};
  //     setNote(newNote);
  //     postReq(noteO, "/update");
  //   } catch(err){
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   console.log(editorState?.getCurrentContent().);
  // }, [editorState])

  const updateNote = (editorState) => {
    try {
      const a = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      setEditorState(editorState);
      const noteO = {
        noteId: params.note_id,
        note: a,
      };
      const p = convertFromRaw(JSON.parse(a));
      dispatch(
        notesAction.updateNote({
          _id: params.note_id,
          note: p.getPlainText(),
        })
      );
      postReq(noteO, "/update");
    } catch (err) {}
  };

  const editTitle = (event) => {
    const n = {...note, title: event.target.value}
    setNote(n);
    const updatedTitle = {noteId: params.note_id, title: event.target.value}
    postReq(updatedTitle, "/update-title");
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if(newState){
      updateNote(editorState);
    }
  }

  const bold = () => {
    updateNote(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }


  useEffect(() => {
    getNote();
  }, [getNote]);

  return (
    <div className={`${classes.body} unselectable`}>
      <div className={classes.upperPart}>
        <div className={classes.leftUpper}>
          <FontAwesomeIcon
            icon={faExpandAlt}
            className={classes.expandArrow}
            color="#cccccc"
          />
          <Divider
            orientation="vertical"
            style={{ height: "22px", width: "1px" }}
            className={classes.verDivider}
          />
          <div className={classes.notebook}>
            <Book className={classes.bookIcon} />
            <span className={classes.text}>First Notebook</span>
          </div>
        </div>
        <div className={classes.rightUpper}>
          <span className={classes.text}>Only you</span>
          <Button type="button" className={classes.button}>
            Share
          </Button>
          <MoreHoriz className={classes.ellipsis} />
        </div>
      </div>
      <div>
        <button onClick={bold}>Bold</button>
      </div>
      <div className={classes.inputDiv}>
        {/* <textarea
          value={note.note}
          ref={noteRef}
          onChange={updateNote}
          className={classes.inputEditor}
        /> */}
        {note.note && <input className={`${classes.title} ${classes.inputEditor}`} value={note.title} onChange={editTitle} />}
        <Editor editorState={editorState} onChange={updateNote}  handleKeyCommand={handleKeyCommand} />
      </div>
      {/* {note.note && <Editor note={note.note} params= {params} dispatch={dispatchNote}/>} */}

      
    </div>
  );
};

export default NotePage;
