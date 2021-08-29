import {
  Drawer,
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
} from "@material-ui/core";
import { Notes, SortOutlined, Filter2Outlined } from "@material-ui/icons";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faSort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import { notesAction } from "store/notes-slice";
import getRequest from "functions/api-calls/get-requests";
import { Fragment } from "react";

const drawerWidth = 280;

const NotesBar = () => {
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.allNotes);

  const useStyles = makeStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      // padding: "18px",
      "& > *": {
        color: "#fff",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      position: "absolute",
      left: 240,
      backgroundColor: "#1a1a1a",
      // borderRight: "0.1px solid #ffffff",
    },
    list: {
      flexDirection: "row",
    },
    iconItem: {
      minWidth: 32,
      marginRight: 4,
      // fontSize: "24px,
    },
    icon: {
      fontSize: 32,
      color: "#fff",
      fontWeight: 600,
      minWidth: 40,
    },
    notesHeading: {
      fontSize: 20,
      minHeight: 28,
      color: "#fff",
      fontWeight: 600,
      display: "-webkit-box",
    },
    notesLength: {
      padding: "8px 20px",
      flex: 2,
    },
    optionsCont: {
      display: "flex",
    },
    sfCont: {
      flex: 2,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "8px 20px",
    },
    sfIcon: {
      fontSize: 20,
    },
    divider: {
      backgroundColor: "#262626",
    },
    noteListItem:{
      height: '120px',
      overflow: 'hidden',
    },
    article:{
    },
    noteItemDiv:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    ListItemRootReplace:{
      display:'block',
    },
    noteText: {
      fontWeight: '14px'
    },
    'MuiList-padding': {
      paddingTop: 0,
      paddingBottom: 0
    }
  });
  const classes = useStyles();

  const getAllNotes = useCallback(async () => {
    try {
      const response = await getRequest("/get-all-notes?sort=0");
      console.log(response);
      dispatch(notesAction.setAllNotes(response));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const notesMap = allNotes.notes.map((note) => {
    return (
      <Fragment>
        <ListItem className={classes.noteListItem} classes={{root: classes.ListItemRootReplace}}>
          <article className={`${classes.article} h-100`}>
            <div className={`${classes.noteItemDiv} h-100`}>
              <div className={`${classes.noteText}`}>
              {note.title}
              </div>
              <div className={`note-clamp ${classes.noteText}`}>
              {note.note}
              </div>
              <div className={`${classes.noteText}`}>
                {note.lastUpdated}
              </div>
            </div>
          </article>
        </ListItem>
        <Divider component="div" classes={{ root: classes.divider }} />
      </Fragment>
    );
  });

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      // anchor="left"
    >
      <Divider />
      <div>
        <ListItem className={classes.list}>
          <ListItemIcon className={classes.iconItem}>
            <Notes className={`${classes.icon}`} />
          </ListItemIcon>
          <ListItemText
            primary="Notes"
            classes={{ primary: classes.notesHeading }}
          />
        </ListItem>
      </div>
      <div className={classes.optionsCont}>
        <span className={classes.notesLength}>{allNotes.totalNotes}</span>
        <span className={classes.sfCont}>
          <FontAwesomeIcon icon={faSort} className={classes.sfIcon} />
          <FontAwesomeIcon icon={faFilter} className={classes.sfIcon} />
          <FontAwesomeIcon icon={faBorderAll} className={classes.sfIcon} />
        </span>
      </div>
      <Divider component="div" classes={{ root: classes.divider }} />
      <List style={{height: `${allNotes.length*120}px`, position: 'relative'}} classes={{padding: classes["MuiList-padding"]}} >{notesMap}</List>
    </Drawer>
  );
};

export default NotesBar;
