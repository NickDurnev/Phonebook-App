import { MouseEvent, forwardRef } from 'react';
import avatars from '../../avatars/avatars';
import List from './AvatarList.styled';
import Modal from '../Modal';

interface IProps {
  onClick: (id: string) => void;
  setIsAvatarList: (a: boolean) => void;
}

const AvatarList = forwardRef<HTMLDivElement, IProps>(
  ({ onClick, setIsAvatarList }, ref) => {
    return (
      <Modal setIsAvatarList={setIsAvatarList} ref={ref}>
        <List
          onClick={(e: MouseEvent<HTMLUListElement>) =>
            onClick((e.target as HTMLLIElement).id)
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
