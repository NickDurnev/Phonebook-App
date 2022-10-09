import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getFilteredContacts from 'redux/contacts/contacts-selectors';
import { TransitionGroup } from 'react-transition-group';
import {
  setModalOpen,
  setContactInfoOpen,
} from '../../redux/isOpen/isOpen-actions';
import { Container } from './ContactList.styled';
import Contact from 'components/Contact';

const ContactList = ({
  data,
  onDelete,
  onEdit,
  animationTimeOut,
  favorite,
}) => {
  const [contacts, setContacts] = useState([]);
  const rootState = useSelector(state => state.rootReducer);
  const filteredContacts = getFilteredContacts(contacts, rootState, favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    setContacts([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const openModalAgreement = id => {
    dispatch(setModalOpen(true));
    onDelete(id);
  };

  const openContactInfo = id => {
    dispatch(setContactInfoOpen(true));
    onEdit(id);
  };

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {filteredContacts.map(item => (
          <Contact
            key={item._id}
            item={item}
            onDelete={_id => openModalAgreement(_id)}
            onEdit={_id => openContactInfo(_id)}
            animationTimeOut={animationTimeOut}
          />
        ))}
      </TransitionGroup>
    </Container>
  );
};

ContactList.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
  favorite: PropTypes.oneOf([null, true, false]),
};

export default ContactList;
