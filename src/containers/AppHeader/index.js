import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classes from '../style.module.css';
import { connect } from 'react-redux';
import { removeNotification } from './behavior';

export function AppHeader(props) {
  return (
    <AppBar position="absolute" className={[classes.appBar, classes.appBarShift].join(' ')}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={[classes.menuButton, classes.menuButtonHidden].join(' ')}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          ECOM-SITE
          </Typography>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {props.userInfos.fullName}
        </Typography>
        <IconButton
          className="toClick"
          color="inherit" onClick={() => props.removeNotification()}>
          <Badge badgeContent={props.count} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export function mapStateToProps(state) {
  return {
    count: state.notifications.notificationCount,
    userInfos: state.userInfos,
  }
}

export default connect(mapStateToProps, { removeNotification })(AppHeader);