import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: contactsInitialState,
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    removeContact(state, action) {
      const someIndex = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(someIndex, 1);
    },
    filterContact(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, filterContact } =
  contactSlice.actions;

export default contactSlice.reducer;
