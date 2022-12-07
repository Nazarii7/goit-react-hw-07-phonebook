import { addContact } from 'redux/contactSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selector';
import css from './FormUser.module.css';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export default function FormUser() {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case 'name':
  //       setName(value);
  //       break;

  //     case 'number':
  //       setNumber(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const hendleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const nameCheck = name => {
      const normalizedName = name.toLowerCase();
      const checked = contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      );
      if (checked) return checked.name;
    };
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (nameCheck(name)) return toast.error(`${name} is already is contacts`);

    dispatch(addContact(contact));

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={hendleSubmit}>
      <h3>Name</h3>
      <label>
        <input
          type="text"
          className={css.input}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          // value={name}
          // onChange={handleChange}
          required
        />
      </label>
      <h3>Number</h3>
      <label>
        <input
          type="tel"
          className={css.input}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          // value={number}
          // onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
}
