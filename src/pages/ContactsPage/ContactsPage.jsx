import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDropListOpen } from '../../redux/isOpen/isOpen-actions';
import { useGetContactsQuery } from '../../redux/contacts/contacts-slice';
import { Container, StyledToastContainer } from './ContactsPage.styled';
import { light } from '../../themes';
//components imports
import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import ContactInfo from '../../components/ContactInfo';
import Filter from '../../components/Filter';
import AgreementModal from '../../components/AgreementModal';
import DropList from '../../components/DropList';
import Button from '../../components/Button';
import NoteLoader from '../../components/NoteLoader';

const ContactsPage = () => {
  let contactId = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);

  const isDropListOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.dropList
  );
  const isModalOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.agreement
  );
  const isContactInfoOpen = useSelector(
    ({ rootReducer }) => rootReducer.isOpen.contactInfo
  );

  const dispatch = useDispatch();

  const {
    data = [],
    isLoading,
    isSuccess,
    error,
  } = useGetContactsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });

  if (error) {
    toast.error(`${error.data}`);
  }

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  console.log(data);
  return (
    <Container onClick={handleClickClose}>
      <Button
        onClick={() => dispatch(setDropListOpen(true))}
        padding={'5px 32px'}
        position={'absolute'}
        positionY={'30px'}
        positionX={'30px'}
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
      <ContactForm data={data} />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <NoteLoader />}
      <CSSTransition
        in={data.length > 0 && isSuccess}
        timeout={animationTimeOut.current}
        unmountOnExit
      >
        <ContactList
          data={data}
          onClick={value => (contactId.current = value)}
          onInfo={value => (contactId.current = value)}
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
        <ContactInfo id={contactId.current} data={data} ref={modalRef} />
      </CSSTransition>
      <StyledToastContainer autoClose={3000} />
    </Container>
  );
};

export default ContactsPage;
