
import { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteContactMutation } from '../../redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { setModalOpen } from '../../redux/isOpen/isOpen-actions';
import { IContact } from '../../services/interfaces';
import Modal from '../Modal';
import Button from '../Button';
import { Wrap } from './Agreement.styled';

interface IProps {
  id: IContact['_id'] | null;
  contacts: IContact[];
  page: number;
  setPage: (a: number) => void;
  onSetSkipQuery: (a: boolean) => void;
}

const Agreement = forwardRef<HTMLDivElement, IProps>(({ id, contacts, page, setPage, onSetSkipQuery }, ref) => {
  const [deleteContact, { isSuccess }] = useDeleteContactMutation();
  const dispatch = useDispatch();

  const checkAgreement = (answear: boolean): void => {
    dispatch(setModalOpen(false));
    if (answear && id) {
      deleteContact(id);
    }
    if (contacts.length === 1) {
      setPage(page - 1)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Contact was deleted', {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setModalOpen(false));
      onSetSkipQuery(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, id])

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
