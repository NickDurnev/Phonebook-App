import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import { Container } from './AppBar.styled';

const AppBar = ({ userLogout }) => {
  const isLogged = useSelector(
    ({ rootReducer }) => rootReducer.isLoggedIn.logged
  );
  return (
    <Container>
      <Navigation />
      {isLogged && <UserMenu userLogout={() => userLogout()} />}
    </Container>
  );
};

AppBar.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default AppBar;
