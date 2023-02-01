import { MouseEvent, forwardRef } from 'react';
import { useAppDispatch } from '../../hooks/rtkQueryHooks';
import { addAvatar } from '../../redux/addAvatar/avatars-slice';
import avatars from '../../avatars/avatars';
import List from './AvatarList.styled';
import Modal from '../Modal';

interface IProps {
  setIsAvatarList: (a: boolean) => void;
}

const AvatarList = forwardRef<HTMLDivElement, IProps>(
  ({ setIsAvatarList }, ref) => {
    const dispatch = useAppDispatch();

    const handleAvatarClick = (id: string) => {
      dispatch(addAvatar(id));
      setIsAvatarList(false);
    };
    return (
      <Modal setIsAvatarList={setIsAvatarList} ref={ref}>
        <List
          onClick={(e: MouseEvent<HTMLUListElement>) =>
            handleAvatarClick((e.target as HTMLLIElement).id)
          }
        >
          {avatars.map((avatar, index) => (
            <li key={index}>
              <img src={avatar} alt="Logo" id={index.toString()} />
            </li>
          ))}
        </List>
      </Modal>
    );
  }
);

export default AvatarList;
