import { useSelector } from 'react-redux';
import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import { Container } from './AppBar.styled';

const AppBar = () => {
  const isLoggedIn = useSelector(({ isLoggedIn }) => isLoggedIn.logged);
  console.log(isLoggedIn);
  return (
    <Container>
      <Navigation />
      {isLoggedIn && <UserMenu />}
    </Container>
  );
};

export default AppBar;
