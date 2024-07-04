import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { getData } from '@containers/App/actions';
import { selectData } from '@containers/App/selectors';

import classes from './style.module.scss';

const Home = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <div className={classes.wrapper}>
      <h3>
        <FormattedMessage id="app_greeting" />
      </h3>
    </div>
  );
};

Home.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  data: selectData,
});

export default connect(mapStateToProps)(Home);
