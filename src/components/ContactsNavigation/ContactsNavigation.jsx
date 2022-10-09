import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import IconButton from 'components/IconButton';
import { NavWrap, LeftIcon, RightIcon } from './ContactsNavigation.styled';

const ContactsNavigation = ({ page, onClick }) => {
  let [active, setActive] = useState(true);
  const animationDelay = useRef(5000);

  setInterval(() => {
    setActive(false);
  }, animationDelay.current);

  setInterval(() => {
    setActive(true);
  }, animationDelay.current * 1.5);

  const pageIncrement = () => {
    const count = page + 1;
    return onClick(count);
  };

  const pageDecrement = () => {
    const count = page - 1;

    return onClick(count);
  };

  return (
    <NavWrap>
      <IconButton onClick={() => pageDecrement()} width="8vw">
        <LeftIcon active={active} />
      </IconButton>
      <IconButton onClick={() => pageIncrement()} width="8vw">
        <RightIcon active={active} />
      </IconButton>
    </NavWrap>
  );
};

ContactsNavigation.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ContactsNavigation;
