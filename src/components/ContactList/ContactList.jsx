import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import getFilteredContacts from 'redux/contacts/contacts-selectors';
import { TransitionGroup } from 'react-transition-group';
import {
  setModalOpen,
  setContactInfoOpen,
} from '../../redux/isOpen/isOpen-actions';
import { Container } from './ContactList.styled';
import Contact from 'components/Contact';

const ContactList = ({ data, onClick, onInfo, animationTimeOut }) => {
  const rootState = useSelector(state => state.rootReducer);
  const filteredContacts = getFilteredContacts(data, rootState);
  const dispatch = useDispatch();

  const openModalAgreement = id => {
    console.log(id);
    dispatch(setModalOpen(true));
    onClick(id);
  };

  const openContactInfo = id => {
    dispatch(setContactInfoOpen(true));
    onInfo(id);
  };

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {filteredContacts.map(item => (
          <Contact
            key={item.id}
            item={item}
            onClick={id => openModalAgreement(id)}
            onInfo={id => openContactInfo(id)}
            animationTimeOut={animationTimeOut}
          />
        ))}
      </TransitionGroup>
    </Container>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default ContactList;
