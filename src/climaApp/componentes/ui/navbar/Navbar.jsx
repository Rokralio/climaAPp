import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { startLogout } from '../../../../store';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(startLogout());
    handleMenuClose();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h1"
            component="div"
            sx={{ fontWeight: 'bold', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={refreshPage}
          >
            ClimaApp
          </Typography>
          <Typography
            component={NavLink}
            to="climaapp/"
            sx={{ marginLeft: 2, fontSize: '1rem', color: 'inherit', textDecoration: 'none' }}
            onClick={handleMenuClose}
          >
            Home
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ marginLeft: 'auto', marginRight: 2 }}>
          {displayName}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
