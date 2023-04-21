import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../redux/operations';
import { selectContacts } from 'redux/selectors';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditIcon, EditBtn } from './ContactEditForm.styled';

export function ContactEditForm({ contact }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const items = useSelector(selectContacts);

  const handleEditWord = event => {
    event.preventDefault();
    const name = event.currentTarget.name.value;
    const number = event.currentTarget.number.value;

    const itemsWithoutContact = items.filter(item => item !== contact);

    const isContactExist = itemsWithoutContact.some(
      contact => contact.name === name || contact.number === number
    );
    if (isContactExist) {
      toast.error(
        <p>
          <span style={{ color: 'red' }}>{name}</span> is already in the list!
        </p>
      );
      return;
    }

    if (contact.name === name && contact.number === number) {
      toast.warning(
        <p>
          You did not change contact{' '}
          <span style={{ color: 'orange' }}>{contact.name}</span>!
        </p>
      );
    }

    dispatch(editContact({ ...contact, name, number }));
    event.currentTarget.reset();
    handleClose();
  };

  return (
    <>
      <EditBtn type="button" onClick={handleShow}>
        <EditIcon />
      </EditBtn>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>Edit the contact</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditWord}>
          <Form.Group
            controlId="contactToEdit"
            style={{
              padding: '10px',
              display: 'flex',
              displayWrap: 'nowrap',
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <InputGroup hasValidation>
              <FloatingLabel
                controlId="floatingContactToEdit"
                label="Edit the contact name"
              >
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={contact.name}
                  placeholder="Anastasia Knihnitska"
                  autoFocus
                  required
                />
              </FloatingLabel>
            </InputGroup>
            <InputGroup hasValidation>
              <FloatingLabel
                label="Edit the phone number"
                controlId="floatingNumber"
              >
                <Form.Control
                  type="text"
                  name="number"
                  defaultValue={contact.number}
                  required
                  placeholder="+38 000 000 00 00"
                />
              </FloatingLabel>
            </InputGroup>
          </Form.Group>
          <Modal.Footer style={{ border: 'none' }}>
            <Button variant="secondary" onClick={handleClose} type="button">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

ContactEditForm.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    colors: PropTypes.shape({
      color: PropTypes.string,
      backgroundColor: PropTypes.string,
    }),
  }).isRequired,
};
