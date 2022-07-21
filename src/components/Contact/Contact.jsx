import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import Button from 'components/Button';
import avatars from 'avatars/avatars';
import { Item, ButtonWrap } from './Contact.styled';

const Contact = ({ item, onClick, onInfo, animationTimeOut, ...rest }) => {
  const { id, name, mobilePhone, avatarId } = item;
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={animationTimeOut}
      classNames="contact-item"
    >
      <Item ref={nodeRef}>
        {avatarId ? (
          <img src={avatars[avatarId]} alt="Logo" />
        ) : (
          <BiUserCircle size="48" />
        )}
        {name}:<span>{mobilePhone}</span>
        <ButtonWrap>
          <Button onClick={() => onInfo(id)}>More info</Button>
          <Button onClick={() => onClick(id)}>Delete</Button>
        </ButtonWrap>
      </Item>
    </CSSTransition>
  );
};

Contact.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mobilePhone: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default Contact;
