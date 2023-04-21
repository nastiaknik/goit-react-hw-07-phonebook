import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../redux/selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from 'components/Layout/Layout';
import { Section } from 'components/Section/Section';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export const App = () => {
  const contacts = useSelector(selectContacts);
  /* const isLoading = useSelector(selectIsLoading); */
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchContacts(controller.signal));

    return () => controller.abort();
  }, [dispatch]);

  return (
    <Layout>
      <Section title="Phonebook">
        <AddContactForm />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts">
          <ContactFilter />
          <ContactList />
        </Section>
      )}
      <ToastContainer newestOnTop={true} autoClose={3000} />
    </Layout>
  );
};
