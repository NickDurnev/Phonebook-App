import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setDropListOpen,
  setContactFormOpen,
} from '../../redux/isOpen/isOpen-actions';
import {
  useGetContactByIdQuery,
  useGetContactsQuery,
} from '../../redux/contacts/contacts-slice';
//# Components
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import ContactInfo from '../../components/ContactEdit';
import Filter from '../../components/Filter';
import AgreementModal from '../../components/AgreementModal';
import DropList from '../../components/DropList';
import Button from '../../components/Button';
import NoteLoader from '../../components/NoteLoader';
import ContactsNavigation from 'components/ContactsNavigation';
//# Styles
import {
  Container,
  ButtonWrap,
  PositionedWrap,
  AllContactsButton,
  FavoriteContactsButton,
} from './ContactsPage.styled';
import { light } from '../../themes';

const ContactsPage = ({ userLogout }) => {
  const [favorite, setFavorite] = useState(null);
  const [page, setPage] = useState(1);
  const [skipGetContact, setSkipGetContact] = useState(true);
  let contactIdRef = useRef(null);
  const contactID = contactIdRef.current;
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

  const { data, isLoading, isSuccess, error, refetch } = useGetContactsQuery(
    { userID, token, favorite, page },
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    }
  );

  const getContactByID = useGetContactByIdQuery(
    { userID, contactID },
    {
      skip: skipGetContact,
    }
  );

  if (isSuccess && data.data.contacts) {
    contacts = data.data.contacts;
  }

  if (error) {
    toast.error(`${error.data.message}`);
    if (error.status === 401) {
      toast.error(`${error.data.message}`);
      userLogout();
      navigate('/login', { replace: true });
    }
  }

  const getFavoriteContacts = () => {
    setFavorite(true);
    setPage(1);
    refetch();
  };

  const getAllContacts = () => {
    setFavorite(false);
    setPage(1);
    refetch();
  };

  const getContact = id => {
    contactIdRef.current = id;
    setSkipGetContact(false);
  };

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  return (
    <Container onClick={handleClickClose}>
      <PositionedWrap>
        <FavoriteContactsButton
          onClick={() => getFavoriteContacts()}
          favorite={favorite}
        >
          Favorites
        </FavoriteContactsButton>
        <AllContactsButton onClick={() => getAllContacts()} favorite={favorite}>
          All
        </AllContactsButton>
      </PositionedWrap>
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
          favorite={favorite}
          onDelete={value => (contactIdRef.current = value)}
          onEdit={id => getContact(id)}
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
        <AgreementModal
          id={contactIdRef.current}
          ref={modalRef}
        ></AgreementModal>
      </CSSTransition>
      <CSSTransition
        nodeRef={modalRef}
        in={isContactInfoOpen && getContactByID.isSuccess}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <ContactInfo
          id={contactIdRef.current}
          data={getContactByID.data}
          ref={modalRef}
        />
      </CSSTransition>
      <ContactsNavigation page={page} onClick={page => setPage(page)} />
    </Container>
  );
};

ContactsPage.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default ContactsPage;
