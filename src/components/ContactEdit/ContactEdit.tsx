import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { forwardRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  useEditContactMutation,
  useAddAvatarMutation,
} from '../../redux/contacts/contacts-slice';
import { setContactEditOpen } from '../../redux/isOpen/isOpen-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/rtkQueryHooks';
import { IContact } from '../../services/interfaces';
import { isErrorWithMessage } from '../../services/helpers';
//# Components
import FileUploader from '../FileUploader';
import Button from '../Button';
import Avatar from '../Avatar';
import Modal from '../Modal';
//# Styles
import {
  Input,
  MaskedInput,
  StyledButton,
} from '../ContactForm/ContactForm.styled';
import {
  InfoForm,
  EmailInput,
  InfoLabel,
  CloseIcon,
} from './ContactEdit.styled';

interface IProps {
  contactID: IContact['_id'];
  data: IContact[];
  onSetSkipQuery: (a: boolean) => void;
}

interface FormValues {
  name: string;
  email: string;
  surname: string;
  phone: string;
}

const ContactEdit = forwardRef<HTMLDivElement, IProps>(
  ({ contactID, data, onSetSkipQuery }, ref) => {
    const dispatch = useAppDispatch();
    const { contactEdit } = useAppSelector(
      ({ rootReducer }) => rootReducer.isOpen
    );
    const { token } = useAppSelector(({ rootReducer }) => rootReducer.auth);
    // eslint-disable-next-line no-unused-vars
    const [editPicture, { error }] = useAddAvatarMutation();
    // eslint-disable-next-line no-unused-vars
    const [editContact, result] = useEditContactMutation();
    const contact = data.find(contact => contact._id === contactID);
    const { name, email, phone, surname, avatarURL } = contact ?? {
      name: '',
      email: '',
      phone: '',
      surname: '',
      avatarURL: '',
    };
    const [imageURL, setImageURL] = useState(avatarURL ?? null);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
      if (isErrorWithMessage(error) && contactEdit) {
        toast.error(`${error.message}`);
        toast.clearWaitingQueue();
      }
    }, [contactEdit, error]);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ criteriaMode: 'all' });

    const handleFile = async (image?: File) => {
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
        if (avatarURL) {
          setImageURL(avatarURL);
          setRerender(!rerender);
        }
      }, 1000);
    };

    const onSubmit: SubmitHandler<FormValues> = async data => {
      const { name, surname, email, phone } = data;
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

    return (
      <Modal ref={ref}>
        <Button
          onClick={() => dispatch(setContactEditOpen(false))}
          bgColor={false}
        >
          <CloseIcon />
        </Button>
        <InfoForm onSubmit={handleSubmit(onSubmit)}>
          <InfoLabel>
            Name
            <Input
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
            <Input
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
            <MaskedInput
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
          {(errors.name || errors.phone) && <span>This field is required</span>}
          <StyledButton type="submit">Submit</StyledButton>
        </InfoForm>
      </Modal>
    );
  }
);

export default ContactEdit;
