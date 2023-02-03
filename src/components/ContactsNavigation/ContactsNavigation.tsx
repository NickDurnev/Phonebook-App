import { useEffect, FC } from 'react';
import IconButton from '../IconButton';
import { NavWrap, LeftIcon, RightIcon } from './ContactsNavigation.styled';
import { IContact } from '../../services/interfaces';

interface IProps {
  contacts: IContact[];
  page: number;
  total: number;
  onClick: (a: number) => void;
}

const ContactsNavigation: FC<IProps> = ({ contacts, page, total, onClick }) => {
  useEffect(() => {
    if (contacts.length === 0 && page > 1) {
      const count = page - 1;
      onClick(count);
      return;
    }
  }, [contacts.length, onClick, page]);

  const pageIncrement = () => {
    if (contacts.length < 10) {
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
    <NavWrap page={page}>
      {page > 1 && <IconButton onClick={() => pageDecrement()} width="8vw">
        <LeftIcon />
      </IconButton>}
      {page * 10 < total && <IconButton onClick={() => pageIncrement()} width="8vw">
        <RightIcon />
      </IconButton>}
    </NavWrap>
  );
};

export default ContactsNavigation;
