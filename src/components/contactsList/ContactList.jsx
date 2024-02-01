import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/operations';
import { useEffect } from 'react';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilter,
} from '../../redux/selectors';

import css from './contactList.module.css';

const ContactList = () => {
  let contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteOnClick = evt => {
    const parentNode = evt.target.parentNode;
    const id = parentNode.getAttribute('data-key');
    dispatch(deleteContact(id));
  };

  if (filter !== '') {
    contacts = contacts.filter(contact => contact.name.includes(filter));
  }

  return (
    <ul className={css.contact_list}>
      {isLoading && !error && (
        <div className={css.loader}>
          <h3>Request in progress...</h3>
        </div>
      )}

      {!isLoading &&
        !error &&
        contacts.length > 0 &&
        contacts.map(contact => {
          return (
            <li key={contact.id} data-key={contact.id}>
              {contact.name} : {contact.phone}
              <button className={css.btn} onClick={handleDeleteOnClick}>
                Delete{' '}
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default ContactList;
