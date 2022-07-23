import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useEditContactMutation } from 'redux/contacts/contacts-slice';
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
  const { name, number } = data.find(({ id }) => id === contactID);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const onSubmit = ({ name, number }) => {
    const patchtData = { id: contactID, name, number };
    editContact(patchtData);
    dispatch(setContactInfoOpen(false));
  };

  return createPortal(
    <Backdrop ref={ref}>
      <Modal>
        <Button
          onClick={() => dispatch(setContactInfoOpen(false))}
          position={'absolute'}
          bgColor={false}
          positionX={'10px'}
          positionY={'10px'}
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
            Mobile phone
            <InfoInput
              defaultValue={number}
              mask="+ 999-99-99-99-999"
              {...register('number', {
                required: 'Mobile phone is required.',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="number"
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
      number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      homePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string,
    })
  ),
};

export default ContactInfo;
