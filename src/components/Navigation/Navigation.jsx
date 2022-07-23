import { useSelector } from 'react-redux';
import { Container, NavLink } from './Navigation.styled';

const Navigation = () => {
  const isLoggedIn = useSelector(({ isLoggedIn }) => isLoggedIn.logged);
  console.log(isLoggedIn);
  return (
    <Container>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
      {!isLoggedIn && (
        <div>
          <NavLink to="/register">Registration</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </Container>
  );
};

export default Navigation;
