import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useEditContactMutation } from 'redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { setContactInfoOpen } from 'redux/isOpen/isOpen-actions';
import {
  Backdrop,
  Modal,
} from 'components/AgreementModal/AgreementModal.styled';
import {
  InfoForm,
  InfoInput,
  InfoButton,
  InfoLabel,
  CloseIcon,
} from './ContactEdit.styled';
import Button from 'components/Button';

const modalRoot = document.querySelector('#modal-root');

const ContactInfo = forwardRef(({ id, data }, ref) => {
  const [editContact, result] = useEditContactMutation();
  console.log(result);
  const dispatch = useDispatch();
  const contactID = id;
  const contact = data.find(({ _id }) => _id === contactID);
  const { name, phone, email, surname } = contact;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const onSubmit = ({ name, phone, email, surname }) => {
    const formattedNumber = phone.replace(/[^0-9]/g, '');
    if (formattedNumber.length < 12) {
      toast.error('Enter full telephone number');
      return;
    }
    const patchtData = { ...contact, name, phone, email, surname };
    editContact(patchtData);
    dispatch(setContactInfoOpen(false));
  };

  return createPortal(
    <Backdrop ref={ref}>
      <Modal>
        <Button
          onClick={() => dispatch(setContactInfoOpen(false))}
          bgColor={false}
        >
          <CloseIcon />
        </Button>
        <InfoForm onSubmit={handleSubmit(onSubmit)}>
          <InfoLabel>
            Name
            <InfoInput
              defaultValue={name}
              {...register('name', {
                required: 'Name is required.',
                pattern: /[A-Za-z]{3}/,
                maxLength: {
                  value: 30,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </InfoLabel>
          <InfoLabel>
            Surname
            <InfoInput
              defaultValue={surname}
              {...register('surname', {
                pattern: /[A-Za-z]{3}/,
                maxLength: {
                  value: 30,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </InfoLabel>
          <InfoLabel>
            Phone
            <InfoInput
              defaultValue={phone}
              mask="+ 999-99-99-99-999"
              {...register('phone', {
                required: 'Phone is required.',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </InfoLabel>
          <InfoLabel>
            Email
            <InfoInput
              defaultValue={email}
              {...register('email', {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                maxLength: {
                  value: 30,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </InfoLabel>
          {errors.exampleRequired && <span>This field is required</span>}
          <InfoButton type="submit">Submit</InfoButton>
        </InfoForm>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

ContactInfo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      homePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string,
    })
  ),
};

export default ContactInfo;
