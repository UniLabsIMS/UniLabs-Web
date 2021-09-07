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
  AccountCircleRounded,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  },
  active: {
    color: theme.palette.secondary.main,
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
  const user = {};

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleLogoutEvent = () => {};

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Typography
            component="h1"
            variant="h4"
            color="inherit"
            noWrap
            className={classes.title}
          >
            UniLabs
          </Typography>
          <Typography>{user ? user.name : ''}</Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              size="medium"
            >
              <AccountCircleRounded fontSize="large" />
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
              <Link to="#" className={classes.appBarLink}>
                <MenuItem>Change Password</MenuItem>
              </Link>
              <MenuItem onClick={handleLogoutEvent}>Logout</MenuItem>
            </Menu>
          </div>
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
