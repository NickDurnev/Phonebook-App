import PropTypes from 'prop-types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useEditContactMutation,
  useAddAvatarMutation,
} from 'redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { setContactInfoOpen } from 'redux/isOpen/isOpen-actions';
//# Components
import FileUploader from 'components/FileUploader';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
//# Styles
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

const modalRoot = document.querySelector('#modal-root');

const ContactInfo = forwardRef(({ id, data }, ref) => {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }) => auth);
  // eslint-disable-next-line no-unused-vars
  const [editPicture, editResult] = useAddAvatarMutation();
  // eslint-disable-next-line no-unused-vars
  const [editContact, result] = useEditContactMutation();
  const { name, email, phone, surname, avatarURL } = data.data.contact;
  const [imageURL, setImageURL] = useState(avatarURL ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const handleFile = async image => {
    const formData = new FormData();
    formData.append('avatar', image);
    formData.append('prevURL', imageURL ?? '');
    const { avatarURL } = await editPicture({
      token,
      id,
      formData,
    }).unwrap();
    setTimeout(() => {
      setImageURL(avatarURL);
    }, 1000);
  };

  const onSubmit = async contact => {
    const formattedNumber = phone.replace(/[^0-9]/g, '');
    if (formattedNumber.length < 12) {
      toast.error('Enter full telephone number');
      return;
    }
    const patchtData = { id, contact };
    await editContact(patchtData);
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
