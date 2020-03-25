import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import KeycloakService from "keycloak";
import { mainListItems, secondaryListItems } from './listItems';
import classes from '../style.module.css';


export default function () {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper),
      }}
    >
      <div className={classes.toolbarIcon}>

      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>

      <Divider />
      <ListItem>
        <Button onClick={() => KeycloakService.doLogout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="LogOut" />
        </Button>
      </ListItem>
    </Drawer>
  );
}