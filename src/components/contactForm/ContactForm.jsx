import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from '../redux/actions';
import { selectContacts } from '../../redux/selectors';
import { fetchContacts, addContact } from '../../redux/operations';

import css from './contactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;

    const { value: name } = event.target.elements[0];
    const { value: phone } = event.target.elements[1];

    if (isContactDuplicate(name)) {
      alert(name + ' is already in contacts.');
      return;
    }

    dispatch(addContact({ name, phone }));

    form.reset();
  };

  const isContactDuplicate = name => {
    return contacts.some(contact => contact.name === name);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <div className={css.form_name}>
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div className={css.form_number}>
          <label>Number</label>
          <input type="text" name="number" required />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
