import PropTypes from 'prop-types';
import { useState, FC, ChangeEvent } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useGetContactsByNameQuery,
  useGetContactsQuery,
} from '../../redux/contacts/contacts-slice';
import { useAppSelector } from '../../hooks/rtkQueryHooks';
import { IContact } from '../../services/interfaces';
import { isFetchBaseQueryError } from '../../services/helpers';

import { Label } from './Filter.styled';

interface IProps {
  onChange: (a: IContact[]) => void;
  favorite: boolean;
  page: number;
  onSetPage: (a: number) => void;
  onSetSkipQuery: (a: boolean) => void;
}

const Filter: FC<IProps> = ({
  onChange,
  favorite,
  page,
  onSetPage,
  onSetSkipQuery,
}) => {
  const [skipSearch, setSkipSearch] = useState(true);
  const [skipQuery, setSkipQuery] = useState(true);
  const [query, setQuery] = useState('');
  const userID = useAppSelector(({ rootReducer }) => rootReducer.auth.user.id);
  const token = useAppSelector(({ rootReducer }) => rootReducer.auth.token);

  const getContactByName = useGetContactsByNameQuery(
    { userID, query, page },
    {
      skip: skipSearch,
    }
  );

  const getAllContacts = useGetContactsQuery(
    { userID, token, favorite, page },
    {
      skip: skipQuery,
    }
  );

  if (
    isFetchBaseQueryError(getContactByName.error) &&
    getContactByName.error.status === 404
  ) {
    onSetPage(1);
    setSkipSearch(true);
    onSetSkipQuery(false);
    if (query !== '') {
      toast.info("Contacts weren't found");
    }
    toast.clearWaitingQueue();
  }


  const setFilters = (e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value.trim();
    if (filter === '') {
      setSkipQuery(false);
      return;
    }
    setQuery(filter);
    setSkipSearch(false);
  };

  if (getContactByName.isSuccess) {
    const { data } = getContactByName.data;
    setSkipSearch(true);
    const contacts = data.contacts;
    onChange([...contacts]);
  }

  if (getAllContacts.isSuccess) {
    const { data } = getAllContacts.data;
    setSkipQuery(true);
    const contacts = data.contacts;
    onChange([...contacts]);
  }

  return (
    <Label>
      Find contacts by name
      <DebounceInput
        maxLength={15}
        debounceTimeout={500}
        onChange={e => setFilters(e)}
      />
    </Label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired,
  onSetSkipQuery: PropTypes.func.isRequired,
};

export default Filter;
