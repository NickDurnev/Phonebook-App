import PropTypes from 'prop-types';
import { useEffect } from 'react';
import IconButton from 'components/IconButton';
import { NavWrap, LeftIcon, RightIcon } from './ContactsNavigation.styled';

const ContactsNavigation = ({ page, onClick, data }) => {
  useEffect(() => {
    if (data.length === 0 && page > 1) {
      const count = page - 1;
      onClick(count);
      return;
    }
  }, [data.length, onClick, page]);

  const pageIncrement = () => {
    if (data.length < 10) {
      return;
    }
    const count = page + 1;
    onClick(count);
  };

  const pageDecrement = () => {
    if (page === 1) {
      return;
    }
    const count = page - 1;
    onClick(count);
  };

  return (
    <NavWrap>
      <IconButton onClick={() => pageDecrement()} width="8vw">
        <LeftIcon />
      </IconButton>
      <IconButton onClick={() => pageIncrement()} width="8vw">
        <RightIcon />
      </IconButton>
    </NavWrap>
  );
};

ContactsNavigation.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ContactsNavigation;
