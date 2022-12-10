import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, removeContacts } from './operation';

const extraActions = [fetchContacts, addContacts, removeContacts];

const getActions = type => extraActions.map(action => action[type]);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    filterContact(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(removeContacts.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          contact => contact.id !== action.payload
        );
        state.contacts.items.splice(index, 1);
      })
      .addMatcher(isAnyOf(...getActions('pending')), state => {
        state.contacts.isLoading = true;
      })
      .addMatcher(isAnyOf(...getActions('rejected')), (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addMatcher(isAnyOf(...getActions('fulfilled')), state => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
      }),
});

export const { filterContact } = contactSlice.actions;

export default contactSlice.reducer;
