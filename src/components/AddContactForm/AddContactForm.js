import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operations';
import { BiErrorCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { getRandomColor } from '../../utils/getRandomColor';
import {
  InputContainer,
  Button,
  StyledField,
  LabelContainer,
  Form,
  Error,
} from './AddContactForm.styled';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short!')
    .max(30, 'Name is too long!')
    .required('Name is required!')
    .label('Name'),
  number: Yup.string()
    .required('Phone number is required!')
    .label('Number')
    .matches(
      /^(\+?\d{1,3}[- ]?)?\d{10}$/,
      'Please provide a valid phone number!'
    ),
});

export const AddContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contact = {
      name: values.name,
      number: values.number,
      colors: getRandomColor(),
      isFavourite: false,
    };

    const contactExists = contacts.some(item => {
      return item.name === contact.name;
    });
    if (contactExists) {
      toast.warning(
        <p>
          Contact <span style={{ color: 'orange' }}>{contact.name}</span>{' '}
          already exist!
        </p>
      );
      return;
    }
    const numberExists = contacts.some(item => {
      return item.number === contact.number;
    });
    if (numberExists) {
      toast.warning(
        <p>
          Number <span style={{ color: 'orange' }}>{contact.number}</span> is
          already in base!
        </p>
      );
      return;
    }

    dispatch(addContact(contact));

    toast.success(
      <p>
        Contact <span style={{ color: 'green' }}>{contact.name}</span> added!
      </p>
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {props => {
        return (
          <Form>
            <InputContainer>
              <LabelContainer>
                <div
                  style={{
                    display: 'flex',
                    wtap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <label htmlFor="name">Name</label>
                  <StyledField
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Anastasia Knihnitska"
                    value={props.values.name}
                    onChange={props.handleChange}
                    className={
                      props.touched.name && props.errors.name ? 'error' : ''
                    }
                  />
                </div>
                <ErrorMessage name="name">
                  {msg => (
                    <Error>
                      <BiErrorCircle /> {msg}
                    </Error>
                  )}
                </ErrorMessage>
              </LabelContainer>
              <LabelContainer>
                <div
                  style={{
                    display: 'flex',
                    wtap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <label htmlFor="number">Number</label>{' '}
                  <StyledField
                    id="number"
                    type="tel"
                    name="number"
                    required
                    placeholder="+38 000 000 00 00"
                    value={props.values.number}
                    onChange={props.handleChange}
                    className={
                      props.touched.number && props.errors.number ? 'error' : ''
                    }
                  />
                </div>
                <ErrorMessage name="number">
                  {msg => (
                    <Error>
                      <BiErrorCircle /> {msg}
                    </Error>
                  )}
                </ErrorMessage>
              </LabelContainer>
            </InputContainer>

            <Button type="submit">Add contact</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
