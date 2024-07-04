import PropTypes from 'prop-types';

import { IconButton, Stack } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useDispatch } from 'react-redux';
import { setTheme } from '@containers/App/actions';

import classes from './style.module.scss';

const TodoNavbar = ({ title, theme }) => {
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const iconStyle = {
    width: '1.5rem',
    height: '1.5rem',
  };
  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.backgroundImage} />
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage}>
          <div className={classes.title}>{title}</div>
        </div>
        <Stack direction="row">
          {/* toogle theme mode */}
          <IconButton onClick={handleTheme}>
            {theme === 'light' ? (
              <NightsStayIcon sx={iconStyle} htmlColor="#ffffff" />
            ) : (
              <LightModeIcon sx={iconStyle} htmlColor="#ffffff" />
            )}
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

TodoNavbar.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
};

export default TodoNavbar;
