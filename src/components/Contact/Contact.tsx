import { useRef, useEffect, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAddFavoriteMutation } from '../../redux/contacts/contacts-slice';
import { IContact } from '../../services/interfaces';
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

interface IProps {
  item: IContact,
  onDelete: (_id: string) => void,
  onEdit: (_id: string) => void,
  onSetSkipQuery: (a: boolean) => void,
  animationTimeOut: number
}

const Contact: FC<IProps> = ({
  item,
  onDelete,
  onEdit,
  onSetSkipQuery,
  animationTimeOut,
  ...rest
}) => {
  const { _id, name, phone, avatarURL } = item;
  // eslint-disable-next-line no-unused-vars
  const [onAdd, { isSuccess }] = useAddFavoriteMutation();

  const addToFavorite = (contactID: string): void => {
    const favorite = !item.favorite;
    onAdd({ contactID, favorite });
  };

  useEffect(() => {
    if (isSuccess) {
      onSetSkipQuery(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={animationTimeOut}
      classNames="contact-item"
    >
      <Item ref={nodeRef}>
        <Avatar imageURL={avatarURL} width="70px" />
        <span><p>{name}:</p></span>
        <span><p>{phone}</p></span>
        <ButtonWrap>
          <IconButton onClick={() => onEdit(_id)} width="30%">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => addToFavorite(_id)} width="30%">
            <FavoriteIcon favorite={item.favorite ? 1 : 0} />
          </IconButton>
          <IconButton onClick={() => onDelete(_id)} width="30%">
            <DeleteIcon />
          </IconButton>
        </ButtonWrap>
      </Item>
    </CSSTransition>
  );
};

export default Contact;
