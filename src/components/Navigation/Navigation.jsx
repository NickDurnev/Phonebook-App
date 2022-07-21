import { Container, NavLink } from './Navigation.styled';

const Navigation = () => (
  <Container>
    <NavLink to="/contacts">Contacts</NavLink>
    <div>
      <NavLink to="/register">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  </Container>
);

export default Navigation;
