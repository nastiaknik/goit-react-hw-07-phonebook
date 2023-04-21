import { useSelector } from 'react-redux';
import { selectFilterValue } from '../../redux/selectors';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ContactItem } from '../ContactItem/ContactItem';
import { Table, TableHead } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  const filter = useSelector(selectFilterValue);

  const handleFilterContact = () => {
    const noFilteredContacts =
      contacts.filter(contact => {
        return (
          contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
          contact.number.includes(filter.trim())
        );
      }).length === 0;
    if (filter && noFilteredContacts) {
      toast.error(
        <p>
          Sorry, there are no contact matching
          <span style={{ color: 'red' }}> {filter}</span>!
        </p>,
        {
          toastId: 'dont-duplicate-pls',
        }
      );
    }

    return contacts
      .filter(contact => {
        return (
          contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
          contact.number.includes(filter.trim())
        );
      })
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
  };

  return (
    <Table>
      <thead>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>
            {contacts.length}
            <span> {contacts.length === 1 ? 'contact' : 'contacts'}</span>
          </TableHead>
        </tr>
      </thead>
      <tbody>
        <ContactItem contacts={handleFilterContact()} />
      </tbody>
    </Table>
  );
};

ContactItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      colors: PropTypes.shape({
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
      }),
    }).isRequired
  ).isRequired,
};
