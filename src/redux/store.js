import { configureStore } from '@reduxjs/toolkit';
import contactReduser from './contactSlice';

export default configureStore({
  reducer: {
    contacts: contactReduser,
  },
});
