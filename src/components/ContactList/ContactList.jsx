import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import {
  setModalOpen,
  setContactEditOpen,
} from '../../redux/isOpen/isOpen-actions';
import { Container } from './ContactList.styled';
import Contact from '../Contact';

const ContactList = ({
  data,
  onDelete,
  onEdit,
  onSetSkipQuery,
  animationTimeOut,
  favorite,
}) => {
  const dispatch = useDispatch();

  const openModalAgreement = id => {
    dispatch(setModalOpen(true));
    onDelete(id);
  };

  const openContactInfo = id => {
    dispatch(setContactEditOpen(true));
    onEdit(id);
  };

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {data.map(item => (
          <Contact
            key={item._id}
            item={item}
            onDelete={_id => openModalAgreement(_id)}
            onEdit={_id => openContactInfo(_id)}
            onSetSkipQuery={onSetSkipQuery}
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
  onSetSkipQuery: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
  favorite: PropTypes.oneOf([null, true, false]),
};

export default ContactList;
