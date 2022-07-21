import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import { Label } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(({ rootReducer }) => rootReducer.filter);
  const dispatch = useDispatch();

  return (
    <Label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        onChange={e => dispatch(changeFilter(e.target.value))}
        value={filter}
      />
    </Label>
  );
};

export default Filter;
