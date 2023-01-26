import { createPortal } from 'react-dom';
import { MouseEvent, forwardRef } from 'react';
import avatars from '../../avatars/avatars';
import List from './AvatarList.styled';
import { Backdrop, Modal } from '../AgreementModal/AgreementModal.styled';

const modalRoot = document.querySelector('#modal-root');

interface IProps  {
  onClick: (id: number) => number;
  setIsAvatarList: (a: boolean) => void;
}

const AvatarList = forwardRef<HTMLInputElement, IProps>(({ onClick, setIsAvatarList }, ref) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsAvatarList(false);
    }
  };
  return createPortal(
    <Backdrop ref={ref} onClick={(e: MouseEvent<HTMLDivElement>) => handleClose(e)}>
      <Modal>
        <List onClick={(e: MouseEvent<HTMLUListElement>) => onClick(e.target.id)}>
          {avatars.map((avatar, index) => (
            <li key={index}>
              <img src={avatar} alt="Logo" id={index} />
            </li>
          ))}
        </List>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

export default AvatarList;
