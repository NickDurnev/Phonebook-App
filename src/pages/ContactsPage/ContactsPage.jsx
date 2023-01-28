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
import { useGetContactsQuery } from '../../redux/contacts/contacts-slice';
//# Components
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import ContactEdit from '../../components/ContactEdit';
import Filter from '../../components/Filter';
import AgreementModal from '../../components/Agreement';
import DropList from '../../components/DropList';
import Button from '../../components/Button';
import NoteLoader from '../../components/NoteLoader';
import ContactsNavigation from '../../components/ContactsNavigation';
//# Styles
import {
  Container,
  ButtonWrap,
  PositionedWrap,
  AllContactsButton,
  FavoriteContactsButton,
} from './ContactsPage.styled';
import { light } from '../../config/themes';

const ContactsPage = ({ userLogout }) => {
  const [favorite, setFavorite] = useState(null);
  const [skipQuery, setSkipQuery] = useState(false);
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);

  let contactIdRef = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(({ auth }) => auth.user.id);
  const token = useSelector(({ auth }) => auth.token);

  const isDropListOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.agreement
  );
  const isContactEditOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactEdit
  );
  const isContactFormOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactForm
  );

  const { data, isLoading, isSuccess, error, refetch } = useGetContactsQuery(
    { userID, token, favorite, page },
    {
      skip: skipQuery,
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    }
  );

  if (isSuccess && data.data.contacts) {
    console.log(data);
    setContacts(data.data.contacts);
    setSkipQuery(true);
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
    setSkipQuery(false);
    refetch();
  };

  const getAllContacts = () => {
    setFavorite(false);
    setPage(1);
    setSkipQuery(false);
    refetch();
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
        <ContactForm
          data={contacts}
          onSetSkipQuery={bool => setSkipQuery(bool)}
          ref={modalRef}
        />
      </CSSTransition>
      <h2>Contacts</h2>
      <Filter
        onChange={data => setContacts(data)}
        favorite={favorite}
        page={page}
        onSetPage={number => setPage(number)}
        onSetSkipQuery={bool => setSkipQuery(bool)}
      />
      {isLoading && <NoteLoader />}
      <CSSTransition
        in={contacts.length >= 0}
        timeout={animationTimeOut.current}
        unmountOnExit
      >
        <ContactList
          data={contacts}
          onDelete={value => (contactIdRef.current = value)}
          onEdit={id => (contactIdRef.current = id)}
          onSetSkipQuery={bool => setSkipQuery(bool)}
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
          onSetSkipQuery={bool => setSkipQuery(bool)}
          ref={modalRef}
        ></AgreementModal>
      </CSSTransition>
      <CSSTransition
        nodeRef={modalRef}
        in={isContactEditOpen}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <ContactEdit
          contactID={contactIdRef.current}
          data={contacts}
          onSetSkipQuery={bool => setSkipQuery(bool)}
          ref={modalRef}
        />
      </CSSTransition>
      {contacts.length > 10 && (
        <ContactsNavigation
          data={contacts}
          page={page}
          onClick={page => setPage(page)}
        />
      )}
    </Container>
  );
};

ContactsPage.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

export default ContactsPage;
