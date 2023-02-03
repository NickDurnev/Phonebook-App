import { useState, forwardRef, ChangeEvent } from 'react';
import { setContactFormOpen } from '../../redux/isOpen/isOpen-actions';
import { useAddContactMutation } from '../../redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { IContact } from '../../services/interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkQueryHooks';
import Button from '../Button';
import Modal from '../Modal';
import {
  CloseIcon, StyledButton
} from '../../generalStyles.styled';
import {
  Wrap,
  Form,
  Label,
  Input,
  MaskedInput,
  Loader,
} from './ContactForm.styled';

interface IProps {
  data: IContact[];
  onSetSkipQuery: (a: boolean) => void;
}

const ContactForm = forwardRef<HTMLDivElement, IProps>(
  ({ data = [], onSetSkipQuery }, ref) => {
    const [name, setName] = useState('');
    const [phone, setNumber] = useState('380');
    const dispatch = useAppDispatch();
    const userID = useAppSelector(
      ({ rootReducer }) => rootReducer.auth.user.id
    );
    const { contactForm } = useAppSelector(
      ({ rootReducer }) => rootReducer.isOpen
    );
    const names = data.map(({ name }) => name.toLowerCase());

    const [createContact, { isLoading, isSuccess }] = useAddContactMutation();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (names.includes(name.toLowerCase()) && contactForm) {
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
      if (name.length < 3) {
        toast.error('Name shoiuld contain minimum 3 symbols', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      createContact({ userID, name, phone });
      reset();
      if (isSuccess) {
        dispatch(setContactFormOpen(false));
        toast.success('Contact was added', {
          position: toast.POSITION.TOP_CENTER,
        });
        onSetSkipQuery(false);
      }
    };

    const reset = () => {
      setName('');
      setNumber('');
    };

    return (

      <Modal ref={ref}>
        <Wrap>
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
                title="Name doesn't may contain special symbols"
                maxLength={20}
                required
                value={name.trim().toLowerCase()}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Phone
              <MaskedInput
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
              ADD
              {isLoading && (
                <Loader size={20} color="white" aria-label="loading" />
              )}
            </StyledButton>
          </Form>
        </Wrap>
      </Modal>
    );
  }
);

export default ContactForm;
