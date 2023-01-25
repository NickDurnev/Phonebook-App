/* eslint-disable no-unused-vars */
import { forwardRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useDeleteContactMutation } from '../../redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { setModalOpen } from '../../redux/isOpen/isOpen-actions';
import { Modal, Backdrop } from './AgreementModal.styled';
import Button from '../Button';

const modalRoot = document.querySelector('#modal-root');

interface IProps  {
  id: string | number;
  onSetSkipQuery: (a: boolean) => void;
}

const AgreementModal = forwardRef<HTMLInputElement, IProps>(({ id, onSetSkipQuery }, ref) => {
  const [deleteContact, result] = useDeleteContactMutation();
  const dispatch = useDispatch();

  const checkAgreement = (answear: boolean) :void => {
    if (answear) {
      deleteContact(id);
      toast.success('Contact was deleted', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(setModalOpen(false));
    onSetSkipQuery(false);
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(setModalOpen(false));
    }
  };

  return createPortal(
    <Backdrop ref={ref} onClick={(e: MouseEvent<HTMLButtonElement>) => handleClose(e)}>
      <Modal>
        <p>Do you really want delete this contact?</p>
        <div>
          <Button onClick={() => checkAgreement(false)} padding={'5px 15px'}>
            No
          </Button>
          <Button onClick={() => checkAgreement(true)} padding={'5px 15px'}>
            Yes
          </Button>
        </div>
      </Modal>
    </Backdrop>,
    modalRoot!
  );
});

export default AgreementModal;
