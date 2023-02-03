import React from 'react';
import { useAppSelector } from '../../hooks/rtkQueryHooks'
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import { Container } from './AppBar.styled';

interface IProps  {
  userLogout: () => void;
}

const AppBar: React.FC<IProps>  = ({ userLogout}) => {
  const isLogged = useAppSelector(
    ({ rootReducer }) => rootReducer.isLoggedIn.logged
  );
  return (
    <Container>
      <Navigation />
      {isLogged && <UserMenu userLogout={() => userLogout()} />}
    </Container>
  );
};

export default AppBar;
