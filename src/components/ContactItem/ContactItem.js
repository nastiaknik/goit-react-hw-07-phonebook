import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  editContact,
  toggleFavorite,
} from '../../redux/operations';
import { RiDeleteBinLine } from 'react-icons/ri';
/* import { IoIosCall } from 'react-icons/io'; */
import { BsStar, BsStarFill } from 'react-icons/bs';
import { getInitials } from '../../utils/getInitials';
import { ContactEditForm } from '.././ContactEditForm/ContactEditForm';
import { getRandomColor } from '../../utils/getRandomColor';
import {
  TableRow,
  Avatar,
  NameCeil,
  NumberCeil,
  ActionCeil,
  Button,
  /* Link, */
} from './ContactItem.styled';

export const ContactItem = ({ contacts }) => {
  const dispatch = useDispatch();

  const onDelete = contact => {
    dispatch(deleteContact(contact.id));
    toast.success(
      <p>
        Contact <span style={{ color: 'green' }}>{contact.name}</span> deleted!
      </p>
    );
  };

  const onFavorite = contact => {
    dispatch(toggleFavorite({ ...contact, isFavorite: !contact.isFavorite }));
    if (contact.isFavorite) {
      toast.success(
        <p>
          Contact <span style={{ color: 'green' }}>{contact.name}</span> removed
          from favorites!
        </p>
      );
      return;
    }
    toast.success(
      <p>
        Contact <span style={{ color: 'green' }}>{contact.name}</span> added to
        favorites!
      </p>
    );
  };

  contacts.map(contact => {
    if (!contact.colors) {
      dispatch(editContact({ ...contact, colors: getRandomColor() }));
    }
    return contact;
  });

  return contacts.map(contact => {
    const currentContact = contacts.find(
      updatedContact => updatedContact.id === contact.id
    );
    return (
      <TableRow key={contact.id}>
        <NameCeil>
          <Avatar style={contact.colors}>{getInitials(contact.name)}</Avatar>
          {contact.name}
        </NameCeil>
        <NumberCeil>{contact.number}</NumberCeil>
        <ActionCeil>
          <Button type="button" onClick={() => onFavorite(contact)}>
            {currentContact.isFavorite ? (
              <BsStarFill size={24} color="#ffd800" />
            ) : (
              <BsStar size={24} color="#ffd800" />
            )}
          </Button>

          <ContactEditForm contact={contact} />

          {/* <Link href={`tel: ${contact.number}`}>
            <IoIosCall size={24} color="green" />
          </Link> */}
          <Button
            type="button"
            onClick={() => {
              onDelete(contact);
            }}
          >
            <RiDeleteBinLine size={24} color="red" />
          </Button>
        </ActionCeil>
      </TableRow>
    );
  });
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
