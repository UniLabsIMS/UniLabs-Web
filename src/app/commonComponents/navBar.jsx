import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { PROFILE_URL } from '../constants';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5px 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarLink: {
    textDecoration: 'none',
    color: 'black',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    textDecoration: 'none',
    color: 'white',
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  itemIcon: {
    paddingLeft: '8px',
    width: 24,
  },
  active: {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
  },
  userDetails: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 150,
  },
}));

function Navbar({ drawerTiles, onDrawerTileClick, activeIndex, showDrawer }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogoutEvent = () => {
    dispatch(logout());
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {showDrawer ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div />
          )}
          <img
            src="/logo192.png"
            alt="logo"
            width="40"
            height="40"
            className={classes.logo}
          />
          <Link to="/" className={classes.title}>
            <Typography component="h1" variant="h4" color="inherit" noWrap>
              {' '}
              UniLabs
            </Typography>
          </Link>
          <Typography className={classes.userDetails}>
            {user && user.firstName.concat(user.lastName).length > 0
              ? user.firstName.concat(' ').concat(user.lastName)
              : user.email}
          </Typography>
          {isAuthenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="medium"
              >
                <img
                  src={
                    user && user.image
                      ? user.image
                      : '/images/default-avatar.jpg'
                  }
                  alt="Profile Pic"
                  className={classes.profilePic}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={menuOpen}
                onClose={handleClose}
              >
                <Link to={PROFILE_URL} className={classes.appBarLink}>
                  <MenuItem>View My Profle</MenuItem>
                </Link>
                <MenuItem onClick={handleLogoutEvent}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div />
          )}
        </Toolbar>
      </AppBar>
      {showDrawer ? (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {drawerTiles.map(child => (
              <ListItem
                key={drawerTiles.indexOf(child)}
                button
                selected={activeIndex === drawerTiles.indexOf(child)}
                onClick={() => onDrawerTileClick(drawerTiles.indexOf(child))}
                className={
                  activeIndex === drawerTiles.indexOf(child)
                    ? classes.active
                    : ''
                }
              >
                <ListItemIcon
                  className={
                    classes.itemIcon &&
                    (activeIndex === drawerTiles.indexOf(child)
                      ? classes.active
                      : '')
                  }
                >
                  {child.icon}
                </ListItemIcon>
                <ListItemText primary={child.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : (
        <div />
      )}
    </>
  );
}
Navbar.defaultProps = {
  showDrawer: false,
  drawerTiles: [],
  activeIndex: 0,
  onDrawerTileClick: () => {},
};
Navbar.propTypes = {
  drawerTiles: PropTypes.arrayOf(PropTypes.object),
  showDrawer: PropTypes.bool,
  activeIndex: PropTypes.number,
  onDrawerTileClick: PropTypes.func,
};

export default Navbar;
