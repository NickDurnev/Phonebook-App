import { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { BiUserCircle } from 'react-icons/bi';
import Button from 'components/Button';
import { Item, ButtonWrap } from './Contact.styled';

const Contact = ({ item, onClick, onInfo, animationTimeOut, ...rest }) => {
  const { id, name, number } = item;

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={animationTimeOut}
      classNames="contact-item"
    >
      <Item ref={nodeRef}>
        <BiUserCircle size="48" />
        {name}:<span>{number}</span>
        <ButtonWrap>
          <Button onClick={() => onInfo(id)}>Edit</Button>
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
    number: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default Contact;
