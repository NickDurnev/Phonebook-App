import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Button from 'components/Button';
import { Container, UserIcon, Icon } from './UserMenu.styled';
import { addAvatar } from 'redux/addAvatar/avatars-slice';
import AvatarList from 'components/AvatarList';
import avatars from 'avatars/avatars';
import { light } from '../../themes';

const UserMenu = ({ userLogout }) => {
  const [isAvatarList, setIsAvatarList] = useState(false);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const { user } = useSelector(({ auth }) => auth);
  const userAvatar = useSelector(
    ({ userAvatarID }) => userAvatarID.userAvatarID
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout();
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
        <p>Hi, {user.name}</p>
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

UserMenu.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default UserMenu;
