import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { setContactFormOpen } from 'redux/isOpen/isOpen-actions';
import { useAddContactMutation } from 'redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import Button from '../Button';
import {
  Backdrop,
  Modal,
} from 'components/AgreementModal/AgreementModal.styled';
import { CloseIcon } from '../ContactEdit/ContactEdit.styled';
import { Form, Label, StyledButton, Input, Loader } from './ContactForm.styled';

const modalRoot = document.querySelector('#modal-root');

const ContactForm = forwardRef(({ data = [] }, ref) => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();
  const userID = useSelector(({ auth }) => auth.user.id);
  const names = data.map(({ name }) => name.toLowerCase());

  const [createContact, { isLoading }] = useAddContactMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (names.includes(name.toLowerCase())) {
      toast.error(`${name} is already in contacts`, {
        position: toast.POSITION.TOP_CENTER,
      });
      reset();
      return;
    }
    const formattedNumber = phone.replace(/[^0-9]/g, '');
    if (formattedNumber.length < 12) {
      toast.error('Enter full telephone number', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    createContact({ userID, name, phone });
    reset();
    dispatch(setContactFormOpen(false));
    toast.success('Contact was added', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return createPortal(
    <Backdrop ref={ref}>
      <Modal>
        <Button
          onClick={() => dispatch(setContactFormOpen(false))}
          bgColor={false}
        >
          <CloseIcon />
        </Button>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Z0-9äöüÄÖÜ]*$"
              title="Name doesn't may contain special symbols"
              maxLength="20"
              required
              value={name}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Phone
            <Input
              type="tel"
              name="phone"
              mask="+ 999-99-99-99-999"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={phone}
              onChange={handleChange}
            />
          </Label>
          <StyledButton type="submit">
            Add contact
            {isLoading && (
              <Loader size={20} color="white" aria-label="loading" />
            )}
          </StyledButton>
        </Form>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

ContactForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
