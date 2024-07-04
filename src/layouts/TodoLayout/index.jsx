import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import TodoNavbar from '@components/TodoNavbar';

const TodoLayout = ({ children, theme, intl: { formatMessage } }) => (
  <div>
    <TodoNavbar title={formatMessage({ id: 'app_title_header' })} theme={theme} />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
});

TodoLayout.propTypes = {
  children: PropTypes.element.isRequired,
  theme: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(TodoLayout));
