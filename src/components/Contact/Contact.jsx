import { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useAddFavoriteMutation } from '../../redux/contacts/contacts-slice';
//# Components
import Avatar from '../Avatar';
import IconButton from '../IconButton';
//# Styles
import {
  Item,
  ButtonWrap,
  EditIcon,
  DeleteIcon,
  FavoriteIcon,
} from './Contact.styled';

const Contact = ({
  item,
  onDelete,
  onEdit,
  onSetSkipQuery,
  animationTimeOut,
  ...rest
}) => {
  const { _id, name, phone, avatarURL, favorite } = item;
  // eslint-disable-next-line no-unused-vars
  const [onAdd, result] = useAddFavoriteMutation();

  const addToFavorite = id => {
    const bool = !favorite;
    onAdd({ id, bool });
    onSetSkipQuery(false);
  };

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={animationTimeOut}
      classNames="contact-item"
    >
      <Item ref={nodeRef}>
        <Avatar imageURL={avatarURL} width="48px" />
        <span>{name}:</span>
        <span>{phone}</span>
        <ButtonWrap>
          <IconButton onClick={() => onEdit(_id)} width="30%">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => addToFavorite(_id)} width="30%">
            <FavoriteIcon favorite={favorite ? 1 : 0} />
          </IconButton>
          <IconButton onClick={() => onDelete(_id)} width="30%">
            <DeleteIcon />
          </IconButton>
        </ButtonWrap>
      </Item>
    </CSSTransition>
  );
};

Contact.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    avatarURL: PropTypes.string,
    favorite: PropTypes.bool.isRequired,
  }),
};

export default Contact;
