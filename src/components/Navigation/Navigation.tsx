import { useAppSelector } from '../../hooks/rtkQueryHooks';
import { Container, NavLink } from './Navigation.styled';

const Navigation = () => {
  const isLogged = useAppSelector(
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
