import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { forwardRef } from 'react';
import avatars from '../../avatars/avatars';
import List from './AvatarList.styled';
import { Backdrop, Modal } from '../AgreementModal/AgreementModal.styled';

const modalRoot = document.querySelector('#modal-root');

const AvatarList = forwardRef(({ onClick, setIsAvatarList }, ref) => {
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      setIsAvatarList(false);
    }
  };
  return createPortal(
    <Backdrop ref={ref} onClick={e => handleClose(e)}>
      <Modal>
        <List onClick={e => onClick(e.target.id)}>
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

AvatarList.propTypes = {
  onClick: PropTypes.func.isRequired,
  setIsAvatarList: PropTypes.func,
};

export default AvatarList;
