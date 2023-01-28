
import {forwardRef} from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteContactMutation } from '../../redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { setModalOpen } from '../../redux/isOpen/isOpen-actions';
import Modal from '../Modal';
import Button from '../Button';
import {Wrap } from './Agreement.styled';

interface IProps  {
  id: string;
  onSetSkipQuery: (a: boolean) => void;
}

const Agreement =forwardRef<HTMLDivElement, IProps> (({ id, onSetSkipQuery }, ref) => {
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

  return (
    <Modal ref={ref}>
      <Wrap>
        <p>Do you really want delete this contact?</p>
        <div>
          <Button onClick={() => checkAgreement(false)} padding={'5px 15px'}>
            No
          </Button>
          <Button onClick={() => checkAgreement(true)} padding={'5px 15px'}>
            Yes
          </Button>
        </div>
        </Wrap>
      </Modal>
  );
});

export default Agreement;
