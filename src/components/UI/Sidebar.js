import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Home,
  Notes,
  List as Tasks,
  Book,
  AccountBox,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { createTheme } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { ExitToApp as Logout } from "@material-ui/icons";

// import getRequest from "../../functions/api-calls/get-requests";
import { loginActions } from "../../store/login-slices";
import useGet from "functions/api-calls/useGet";
// import classes from "./style-modules/Sidebar.module.css";

const drawerWidth = 240;
const Sidebar = () => {
  const user = useSelector((state) => state.login.user);
  const getRequest = useGet();

  const { path } = useRouteMatch();

  const theme_s = createTheme({
    typography: {
      fontFamily: ["IBM Medium","Oxygen"].join(","),
    },
  });

  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      const user = await getRequest("/get-user");
      dispatch(loginActions.setUser({ user: user }));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    var timeout;
    if (!user) {
      timeout = setTimeout(() => {
        getUser();
        console.log(timeout);
      }, 5000);
    } else {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [getUser, user]);

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
      borderRight: "0.01ch solid #ffffff",
    },
    name: {
      color: "#fff",
      "& > *": {
        fontFamily: theme_s.typography.fontFamily
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    link: {
      color: "#fff !important",
      textDecoration: "none",
    },
    icon: {
      color: "#cccccc",
      fontSize: "24px",
    },
    iconItem: {
      minWidth: "24px",
      marginRight: "4px",
      fontSize: "24px",
    },
    item: {
      width: drawerWidth - 8,
      marginLeft: "4px",
      marginRight: "4px",
      color: "#757575",
      fontWeight: "bolder",
      "&:hover": {
        backgroundColor: "#262626",
        borderRadius: "4px",
      },
    },
    itemText: {
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
      fontFamily: theme_s.typography.fontFamily,
    },
    active: {
      width: drawerWidth - 8,
      "& > *": {
        backgroundColor: "#333333",
        borderRadius: "4px",
        color: "#cccccc",
      },
    },
  }));

  const classes = useStyles();

  const logoutUser = () => {
    dispatch(loginActions.logoutUser());
  }

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
          <ListItemIcon className={classes.iconItem}>
            <AccountBox className={`${classes.icon} `} />
          </ListItemIcon>
          <ListItemText
            primary={user.name}
            className={`${classes.name}`}
            // style={{ paddingTop: "4px" }}
          />
        </ListItem>
      </div>
      <Divider />
      <List>
        {[
          {
            text: "Home",
            to: "/app/home",
            icon: <Home className={classes.icon} />,
            function: () => {}
          },
          {
            text: "Notes",
            to: "/app/notes",
            icon: <Notes className={classes.icon} />,
            function: () => {}
          },
          {
            text: "Notebooks",
            to: "/app/notebooks",
            icon: <Book className={classes.icon} />,
            function: () => {}
          },
          {
            text: "Tasks",
            to: "/app/tasks",
            icon: <Tasks className={classes.icon} />,
            function: () => {}
          },
          {
            text: "Logout",
            to: '/welcome',
            icon: <Logout className={classes.icon} />,
            function: logoutUser
          }
        ].map((item, index) => (
          <NavLink
            to={item.to}
            className={classes.link}
            activeClassName={classes.active}
            key={index}
            onClick={item.function}
          >
            <ListItem
              button
              className={`${classes["active-child"]} ${classes.item} `}
            >
              <ListItemIcon className={classes.iconItem}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                // style={{ paddingTop: "4px" }}
                classes={{ primary: classes.itemText, root: classes.itemText }}
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
