import { useState, useRef, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../../hooks/rtkQueryHooks';
import Button from '../Button';
import { Container, UserIcon, Icon } from './UserMenu.styled';
import AvatarList from '../AvatarList';
import avatars from '../../avatars/avatars';
import { light } from '../../config/themes';

interface IProps {
  userLogout: () => void;
}

const UserMenu: FC<IProps> = ({ userLogout }) => {
  const [isAvatarList, setIsAvatarList] = useState<boolean>(false);
  const animationTimeOut = useRef<number>(parseInt(light.animationDuration));
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(({ rootReducer }) => rootReducer.auth);
  const userAvatar = useAppSelector(
    ({ rootReducer }) => rootReducer.userAvatarID.userAvatarID
  );

  const handleLogout = () => {
    userLogout();
  };


  return (
    <>
      <Container>
        <Button onClick={() => setIsAvatarList(true)} bgColor={false}>
          {userAvatar ? (
            <Icon src={avatars[+userAvatar]} alt="avatar" />
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
          setIsAvatarList={setIsAvatarList}
          ref={modalRef}
        />
      </CSSTransition>
    </>
  );
};

export default UserMenu;
