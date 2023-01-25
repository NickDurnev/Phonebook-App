import { useSelector } from 'react-redux';
import { Container, NavLink } from './Navigation.styled';

const Navigation = () => {
  const isLogged = useSelector(
    ({ rootReducer }) => rootReducer.isLoggedIn.logged
  );
  return (
    <Container>
      {isLogged && <NavLink to="/contacts">Contacts</NavLink>}
      {!isLogged && (
        <div>
          <NavLink to="/register">Registration</NavLink>
          <NavLink to="/login/null">Login</NavLink>
        </div>
      )}
    </Container>
  );
};

export default Navigation;
