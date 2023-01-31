import { useRef, useState, useEffect, FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setDropListOpen,
  setContactFormOpen,
} from '../../redux/isOpen/isOpen-actions';
import { useGetContactsQuery } from '../../redux/contacts/contacts-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkQueryHooks';
import { IContact } from '../../services/interfaces';
import { isFetchBaseQueryError } from '../../services/helpers';
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
  Wrap,
  ButtonWrap,
  PositionedWrap,
  AllContactsButton,
  FavoriteContactsButton,
} from './ContactsPage.styled';
import { light } from '../../config/themes';

interface IProps {
  userLogout: () => void;
}

const ContactsPage: FC<IProps> = ({ userLogout }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [skipQuery, setSkipQuery] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [contacts, setContacts] = useState<IContact[]>([]);

  let contactIdRef = useRef<string | null>(null);
  const animationTimeOut = useRef<number>(parseInt(light.animationDuration));
  const modalRef = useRef<HTMLDivElement>(null);
  const dropListRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userID = useAppSelector(({ rootReducer }) => rootReducer.auth.user.id);
  const token = useAppSelector(({ rootReducer }) => rootReducer.auth.token);

  const isDropListOpen = useAppSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useAppSelector(
    ({ rootReducer }) => rootReducer.isOpen.agreement
  );
  const isContactEditOpen = useAppSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactEdit
  );
  const isContactFormOpen = useAppSelector(
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

  if (isFetchBaseQueryError(error)) {
    const errMsg = 'error' in error ? error.error : error.data;
    toast.error(`${errMsg}`);
    if (error.status === 401) {
      userLogout();
      navigate('/login', { replace: true });
    }
  }

  if (isSuccess && data.data.contacts) {
    console.log(data.data.contacts);
    setContacts(data.data.contacts);
    setSkipQuery(true);
  }

  useEffect(() => {
    console.log(data);
    setSkipQuery(false);
    refetch();
  }, [page])


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

  const handleClickClose = (e: MouseEvent<HTMLDivElement>) => {
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
        CHOOSE THEME
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
      <Wrap>
        <h1>PHONEBOOK</h1>
        <ButtonWrap>
          <Button onClick={() => dispatch(setContactFormOpen(true))}>
            ADD CONTACT
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
        {contacts.length >= 10 && (
          <ContactsNavigation
            data={contacts}
            page={page}
            onClick={page => setPage(page)}
          />
        )}
      </Wrap>
    </Container>
  );
};

export default ContactsPage;
