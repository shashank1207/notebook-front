import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Attachment } from "@material-ui/icons";
import moduleClasses from './SliderContent.module.css';
import { makeStyles } from "@material-ui/core";
import AttachmentList from "./AttachmentList";

const SliderContent = ( ) => {
  const classes = makeStyles({
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
  })();

  return(
    <div className={classes.attachment}>
      <ListItem>
        <ListItemIcon className={classes.iconItem}>
          <Attachment className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Attachments" classes={{primary: classes.notesHeading}} />
      </ListItem>
      <div className={moduleClasses.selector}>
        <span className={moduleClasses['selector-options']}>Files</span>
        <span className={moduleClasses['selector-options']}>Checklist</span>
      </div>
      <div className="h-100">
        <AttachmentList />
      </div>
    </div>
  )
};

export default SliderContent;