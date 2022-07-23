import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { Container, UserIcon, Icon } from './UserMenu.styled';
import { persistor } from '../../redux/store';
import { addAvatar } from 'redux/addAvatar/avatars-slice';
import { setCredentials } from 'redux/auth/auth-slice';
import { setLoggedIn } from 'redux/auth/logged-slice';
import AvatarList from 'components/AvatarList';
import avatars from 'avatars/avatars';
import { light } from '../../themes';

const UserMenu = () => {
  const [isAvatarList, setIsAvatarList] = useState(false);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const userEmail = useSelector(({ auth }) => auth.user.email);
  const userAvatar = useSelector(
    ({ userAvatarID }) => userAvatarID.userAvatarID
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReset = { user: { name: '', email: '' }, token: '' };

  const handleLogout = () => {
    dispatch(setCredentials(userReset));
    dispatch(setLoggedIn(false));
    persistor.purge();
    navigate('/login', { replace: true });
  };

  const handleAvatarClick = id => {
    dispatch(addAvatar(id));
    setIsAvatarList(false);
  };

  return (
    <>
      <Container>
        <Button onClick={() => setIsAvatarList(true)} bgColor={false}>
          {userAvatar ? (
            <Icon src={avatars[userAvatar]} alt="avatar" />
          ) : (
            <UserIcon />
          )}
        </Button>
        <p>Hi,{userEmail}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
      <CSSTransition
        nodeRef={modalRef}
        in={isAvatarList}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <AvatarList
          onClick={id => handleAvatarClick(id)}
          setIsAvatarList={setIsAvatarList}
          ref={modalRef}
        />
      </CSSTransition>
    </>
  );
};

export default UserMenu;
