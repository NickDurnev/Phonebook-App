import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetContactsByNameQuery } from 'redux/contacts/contacts-slice';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import { Label } from './Filter.styled';

const Filter = ({ onChange }) => {
  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const filter = useSelector(({ rootReducer }) => rootReducer.filter);
  const userID = useSelector(({ auth }) => auth.user.id);
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useGetContactsByNameQuery(
    { userID, query, page },
    {
      skip,
    }
  );

  const setFilters = e => {
    const filter = e.target.value.trim();
    dispatch(changeFilter(filter));
    setQuery(filter);
    setSkip(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setSkip(true);
      setQuery('');
      const contacts = data.data.contacts;
      if (contacts.length === 0) {
        toast.info("Contacts weren't found");
        return;
      }
      onChange(contacts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, onChange]);

  return (
    <Label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        onChange={e => setFilters(e)}
        value={filter}
      />
    </Label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
