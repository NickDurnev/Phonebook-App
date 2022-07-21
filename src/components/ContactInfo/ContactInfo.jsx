import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useEditContactMutation } from 'redux/contacts/contacts-slice';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { BiUserCircle } from 'react-icons/bi';
import { setContactInfoOpen } from 'redux/isOpen/isOpen-actions';
import {
  Backdrop,
  Modal,
} from 'components/AgreementModal/AgreementModal.styled';
import {
  InfoForm,
  Icon,
  InfoInput,
  InfoButton,
  InfoLabel,
  EditIcon,
  CloseIcon,
} from './ContactInfo.styled';
import avatars from 'avatars/avatars';
import AvatarList from 'components/AvatarList';
import Button from 'components/Button';

const modalRoot = document.querySelector('#modal-root');

const ContactInfo = forwardRef(({ id, data }, ref) => {
  const [isAvatarList, setIsAvatarList] = useState(false);
  const avatar = useRef(null);
  console.log(avatar.current);
  const [editContact, result] = useEditContactMutation();
  console.log(result);
  const dispatch = useDispatch();
  const contactID = id;
  const { name, mobilePhone, homePhone, company, avatarId } = data.find(
    ({ id }) => id === contactID
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      setIsAvatarList(false);
    }
  };

  const onSubmit = data => {
    if (!avatar.current && avatarId) {
      avatar.current = avatarId;
    }
    const contactData = { id: contactID, ...data, avatarId: avatar.current };
    editContact(contactData);
    dispatch(setContactInfoOpen(false));
  };

  const handleAvatarClick = id => {
    avatar.current = id;
    setIsAvatarList(false);
  };

  return createPortal(
    <Backdrop ref={ref} onClick={e => handleClose(e)}>
      <Modal>
        {isAvatarList && <AvatarList onClick={id => handleAvatarClick(id)} />}
        {!isAvatarList && (
          <>
            <Button
              onClick={() => dispatch(setContactInfoOpen(false))}
              position={'absolute'}
              bgColor={false}
              positionX={'10px'}
              positionY={'10px'}
            >
              <CloseIcon />
            </Button>
            <Button
              onClick={() => setIsAvatarList(true)}
              position={'relative'}
              bgColor={false}
            >
              {avatarId ? (
                <Icon src={avatars[avatar.current || avatarId]} alt="Logo" />
              ) : (
                <BiUserCircle
                  size="128"
                  style={{
                    backgroundColor: '#BEB9B9 ',
                    color: '#2D2C2C ',
                    borderRadius: '10px',
                  }}
                />
              )}
              <EditIcon />
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
                  defaultValue={mobilePhone}
                  mask="+ 999-99-99-99-999"
                  {...register('mobilePhone', {
                    required: 'Mobile phone is required.',
                    minLength: {
                      value: 18,
                      message: 'This phone is too short',
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="mobilePhone"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  }
                />
              </InfoLabel>
              <InfoLabel>
                Home phone
                <InfoInput
                  defaultValue={homePhone}
                  mask="+ 999-99-99-99-999"
                  {...register('homePhone', {})}
                />
              </InfoLabel>
              <InfoLabel>
                Company
                <InfoInput
                  defaultValue={company}
                  {...register('company', { pattern: /[A-Za-z]{3}/ })}
                />
              </InfoLabel>
              {errors.exampleRequired && <span>This field is required</span>}
              <InfoButton type="submit">Submit</InfoButton>
            </InfoForm>
          </>
        )}
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
      mobilePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      homePhone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string,
    })
  ),
};

export default ContactInfo;
