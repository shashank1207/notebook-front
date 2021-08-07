import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home, Notes, List as Tasks, Book, AccountBox } from "@material-ui/icons";
import { useSelector } from "react-redux";


import { NavLink } from "react-router-dom";
// import classes from "./style-modules/Sidebar.module.css";

const drawerWidth = 240;
const Sidebar = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#000000",
    },
    name: {
      color: '#fff'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    link: {
      color: "#fff !important",
      textDecoration: "none",
    },
    icon: {
      color:'#fff',
      fontSize: '25px'
    },
    iconItem: {
      minWidth: '24px',
      marginRight: '12px'
    },
    item: {
      paddingTop: '4px',
      paddingBottom: '4px',
      width: drawerWidth-8,
      "&:hover": {
        backgroundColor: "rgb(120,120,120)",
        borderRadius: '4px',
        marginLeft: '4px',
        marginRight: '4px'
      },
    },
    active: {
      width: drawerWidth-12,
      "& > *": {
        backgroundColor: "rgb(180,180,180)",
        borderRadius: '4px',
        marginLeft: '4px',
        marginRight: '4px'
      },
    },
  }));

  const classes = useStyles();

  const user = useSelector(state => state.login.user);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Divider />
      <div>
        <ListItem key={`${user.userId}_${Math.random()}`}>
          <ListItemIcon className={classes.iconItem}><AccountBox className={`${classes.icon} `} /></ListItemIcon>
          <ListItemText primary={user.name} className={`${classes.name}`} style={{paddingTop: '4px'}}/>
        </ListItem>
      </div>
      <Divider />
      <List>
        {[
          { text: "Home", to: "/home", icon: <Home className={classes.icon} /> },
          { text: "Notes", to: "/notes", icon: <Notes className={classes.icon} /> },
          { text: "Notebooks", to: "/notebooks", icon: <Book className={classes.icon} /> },
          { text: "Tasks", to: "/tasks", icon: <Tasks className={classes.icon} /> },
        ].map((item, index) => (
          <NavLink
            to={item.to}
            className={classes.link}
            activeClassName={classes.active}
            key={index}
          >
            <ListItem
              button
              className={`${classes["active-child"]} ${classes.item} `}
            >
              <ListItemIcon className={classes.iconItem}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} style={{paddingTop: '4px'}} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
