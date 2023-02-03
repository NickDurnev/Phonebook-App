import PropTypes from 'prop-types';
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useGetContactsByNameQuery,
} from '../../redux/contacts/contacts-slice';
import { useAppSelector } from '../../hooks/rtkQueryHooks';
import { IContact } from '../../services/interfaces';
import { isFetchBaseQueryError } from '../../services/helpers';

import { Label } from './Filter.styled';

interface IProps {
  onChange: (a: IContact[]) => void;
  page: number;
  query: string;
  setQuery: (a: string) => void;
  onSetPage: (a: number) => void;
  onSetSkipQuery: (a: boolean) => void;
}

const Filter: FC<IProps> = ({
  onChange,
  page,
  query,
  setQuery,
  onSetPage,
  onSetSkipQuery,
}) => {
  const [skipSearch, setSkipSearch] = useState(true);
  const userID = useAppSelector(({ rootReducer }) => rootReducer.auth.user.id);

  const { data, error, isSuccess, refetch } = useGetContactsByNameQuery(
    { userID, query, page },
    {
      skip: skipSearch,
    }
  );

  useEffect(() => {
    if (query) {
      setSkipSearch(false);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  if (
    isFetchBaseQueryError(error) &&
    error.status === 404
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
      onSetPage(1);
      onSetSkipQuery(false);
      return;
    }
    setQuery(filter);
    setSkipSearch(false);
  };

  if (isSuccess) {
    const { contacts } = data.data;
    setSkipSearch(true);
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
