import PropTypes from 'prop-types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  useEditContactMutation,
  useAddAvatarMutation,
} from '../../redux/contacts/contacts-slice';
import { setContactEditOpen } from '../../redux/isOpen/isOpen-actions';
//# Components
import FileUploader from '../FileUploader';
import Button from '../Button';
import Avatar from '../Avatar';
//# Styles
import { Backdrop, Modal } from '../Agreement/Agreement.styled';
import {
  InfoForm,
  InfoInput,
  EmailInput,
  InfoButton,
  InfoLabel,
  CloseIcon,
} from './ContactEdit.styled';

const modalRoot = document.querySelector('#modal-root');

const ContactEdit = forwardRef(({ contactID, data, onSetSkipQuery }, ref) => {
  const dispatch = useDispatch();
  const { contactEdit } = useSelector(({ rootReducer }) => rootReducer.isOpen);
  const { token } = useSelector(({ auth }) => auth);
  // eslint-disable-next-line no-unused-vars
  const [editPicture, addPicture] = useAddAvatarMutation();
  // eslint-disable-next-line no-unused-vars
  const [editContact, result] = useEditContactMutation();
  const contact = data.find(contact => contact._id === contactID);
  const { name, email, phone, surname, avatarURL } = contact;
  const [imageURL, setImageURL] = useState(avatarURL ?? null);
  const [rerender, setRerender] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const handleFile = async image => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', image);
    formData.append('prevURL', imageURL ?? '');
    const { avatarURL } = await editPicture({
      token,
      contactID,
      formData,
    }).unwrap();
    setTimeout(() => {
      setImageURL(avatarURL);
      setRerender(!rerender);
    }, 1000);
  };

  if (addPicture.isError && contactEdit) {
    toast.error(`${addPicture.error.data.message}`);
    toast.clearWaitingQueue();
  }

  console.log(addPicture.isError);
  console.log(contactEdit);

  const onSubmit = async ({ name, surname, email, phone }) => {
    const nameData = name.trim().toLowerCase();
    const surnameData = surname.trim().toLowerCase();
    const emailData = email.trim().toLowerCase();
    const formattedNumber = phone.replace(/[^0-9]/g, '');
    if (formattedNumber.length < 12) {
      toast.error('Enter full telephone number');
      return;
    }
    const contact = {
      name: nameData,
      surname: surnameData,
      email: emailData,
      phone: phone,
    };
    await editContact({ contactID, contact });
    onSetSkipQuery(false);
    dispatch(setContactEditOpen(false));
  };

  return createPortal(
    <Backdrop ref={ref}>
      <Modal>
        <Button
          onClick={() => dispatch(setContactEditOpen(false))}
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
                maxLength: {
                  value: 20,
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
                  value: 20,
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
            <EmailInput
              defaultValue={email}
              {...register('email', {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          <FileUploader handleFile={image => handleFile(image)}>
            <Avatar imageURL={imageURL} width="100px" />
          </FileUploader>
          {errors.exampleRequired && <span>This field is required</span>}
          <InfoButton type="submit">Submit</InfoButton>
        </InfoForm>
      </Modal>
    </Backdrop>,
    modalRoot
  );
});

ContactEdit.propTypes = {
  contactID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      homePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string,
    })
  ),
  onSetSkipQuery: PropTypes.func.isRequired,
};

export default ContactEdit;
