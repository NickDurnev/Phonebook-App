import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import { Container } from './AppBar.styled';

const AppBar = ({ userLogout }) => {
  const isLoggedIn = useSelector(({ isLoggedIn }) => isLoggedIn.logged);
  return (
    <Container>
      <Navigation />
      {isLoggedIn && <UserMenu userLogout={() => userLogout()} />}
    </Container>
  );
};

AppBar.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default AppBar;
