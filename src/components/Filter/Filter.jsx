import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetContactsByNameQuery } from 'redux/contacts/contacts-slice';
import { Label } from './Filter.styled';

const Filter = ({ onChange, page, onSetPage, onSetSkipQuery }) => {
  const [skipSearch, setSkipSearch] = useState(true);
  const [query, setQuery] = useState('');
  const userID = useSelector(({ auth }) => auth.user.id);

  const { data, isSuccess, error } = useGetContactsByNameQuery(
    { userID, query, page },
    {
      skip: skipSearch,
    }
  );

  const setFilters = e => {
    const filter = e.target.value.trim();
    setQuery(filter);
    setSkipSearch(false);
  };

  if (isSuccess) {
    setSkipSearch(true);
    const contacts = data.data.contacts;
    onChange([...contacts]);
  }

  if (error && error.status === 404) {
    onSetPage(1);
    setSkipSearch(true);
    onSetSkipQuery(false);
    if (query !== '') {
      toast.info("Contacts weren't found");
    }
    toast.clearWaitingQueue();
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
