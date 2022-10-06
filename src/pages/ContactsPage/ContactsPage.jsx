import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setDropListOpen,
  setContactFormOpen,
} from '../../redux/isOpen/isOpen-actions';
import { useGetContactsQuery } from '../../redux/contacts/contacts-slice';
import { Container, ButtonWrap } from './ContactsPage.styled';
import { light } from '../../themes';
//# Components
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import ContactInfo from '../../components/ContactEdit';
import Filter from '../../components/Filter';
import AgreementModal from '../../components/AgreementModal';
import DropList from '../../components/DropList';
import Button from '../../components/Button';
import NoteLoader from '../../components/NoteLoader';

const ContactsPage = ({ userLogout }) => {
  let contactId = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(({ auth }) => auth.user.id);
  const token = useSelector(({ auth }) => auth.token);
  let contacts = [];

  const isDropListOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.agreement
  );
  const isContactInfoOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactInfo
  );
  const isContactFormOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactForm
  );

  const { data, isLoading, isSuccess, error } = useGetContactsQuery(
    { userID, token },
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    }
  );

  if (error) {
    toast.error(`${error.data.message}`);
    console.log(error.status);
    if (error.status === 401) {
      toast.error(`${error.data.message}`);
      userLogout();
      navigate('/login', { replace: true });
    }
  }

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  if (isSuccess) {
    contacts = data.data.contacts;
  }

  return (
    <Container onClick={handleClickClose}>
      <Button
        onClick={() => dispatch(setDropListOpen(true))}
        padding={'5px 20px'}
      >
        Choose theme
      </Button>
      <CSSTransition
        nodeRef={dropListRef}
        in={isDropListOpen}
        timeout={animationTimeOut.current}
        classNames="drop"
        unmountOnExit
      >
        <DropList ref={dropListRef}></DropList>
      </CSSTransition>
      <h1>Phonebook</h1>
      <ButtonWrap>
        <Button onClick={() => dispatch(setContactFormOpen(true))}>
          Add contact
        </Button>
      </ButtonWrap>
      <CSSTransition
        nodeRef={modalRef}
        in={isContactFormOpen}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <ContactForm data={contacts} ref={modalRef} />
      </CSSTransition>
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <NoteLoader />}
      <CSSTransition
        in={contacts && isSuccess}
        timeout={animationTimeOut.current}
        unmountOnExit
      >
        <ContactList
          data={contacts}
          onDelete={value => (contactId.current = value)}
          onEdit={value => (contactId.current = value)}
          animationTimeOut={animationTimeOut.current}
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={modalRef}
        in={isModalOpen}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <AgreementModal id={contactId.current} ref={modalRef}></AgreementModal>
      </CSSTransition>
      <CSSTransition
        nodeRef={modalRef}
        in={isContactInfoOpen}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <ContactInfo id={contactId.current} data={contacts} ref={modalRef} />
      </CSSTransition>
    </Container>
  );
};

ContactsPage.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default ContactsPage;
