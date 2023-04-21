import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from '../../redux/filterSlice';
import { selectFilterValue } from '../../redux/selectors';
import { FilterContainer, FilterInput } from './ContactFilter.styled';

export const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterValue);

  return (
    <FilterContainer>
      <label htmlFor="filter">
        <FiSearch size={20} />
      </label>
      <FilterInput
        id="filter"
        type="text"
        onChange={event => dispatch(setFilterValue(event.target.value))}
        value={filter}
        name="filter"
        placeholder="Search contacts"
      />
    </FilterContainer>
  );
};
