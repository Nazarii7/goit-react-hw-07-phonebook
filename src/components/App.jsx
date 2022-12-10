import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormUser from './FormUser/FormUser';
import ContactList from './ContactList/ListUsers';
import FilterUser from './Filter/FilterUser';
import { fetchContacts } from 'redux/operation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading, getError } from 'redux/selector';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        width: '1000px',
        margin: '0 auto',
        padding: '0 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'antiquewhite',
      }}
    >
      <h1>Phonebook</h1>
      <FormUser />
      <h2>Contacts</h2>
      <div>
        <FilterUser />
        {isLoading && !error && <b>Request in progress...</b>}
        <ContactList />
      </div>
      <ToastContainer />
    </div>
  );
};
