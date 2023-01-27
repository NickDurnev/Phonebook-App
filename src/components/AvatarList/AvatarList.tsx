import React, {MouseEvent} from 'react';
import avatars from '../../avatars/avatars';
import List from './AvatarList.styled';
import Modal from '../Modal';

interface IProps  {
  onClick: (id: string) => string;
  setIsAvatarList: (a: boolean) => void;
}

const AvatarList: React.FC<IProps> = (({ onClick, setIsAvatarList }) => {

  return (
      <Modal setIsAvatarList={setIsAvatarList}>
        <List onClick={(e: MouseEvent<HTMLUListElement>) => onClick((e.target as HTMLLIElement).id)}>
          {avatars.map((avatar, index) => (
            <li key={index}>
              <img src={avatar} alt="Logo" id={index.toString()} />
            </li>
          ))}
        </List>
      </Modal>
  );
});

export default AvatarList;
