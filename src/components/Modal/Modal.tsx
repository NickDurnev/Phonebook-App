/* eslint-disable no-unused-vars */
import { forwardRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '../../redux/isOpen/isOpen-actions';
import { Container, Backdrop } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')!;

interface IProps {
  children?: JSX.Element | JSX.Element[];
  setIsAvatarList?: (a: boolean) => void;
}

const Modal = forwardRef<HTMLInputElement, IProps>(
  ({ children, setIsAvatarList }, ref) => {
    const dispatch = useDispatch();

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        dispatch(setModalOpen(false));
        if (setIsAvatarList) {
          setIsAvatarList(false);
        }
      }
    };

    return createPortal(
      <Backdrop
        ref={ref}
        onClick={(e: MouseEvent<HTMLDivElement>) => handleClose(e)}
      >
        <Container>{children}</Container>
      </Backdrop>,
      modalRoot!
    );
  }
);

export default Modal;
