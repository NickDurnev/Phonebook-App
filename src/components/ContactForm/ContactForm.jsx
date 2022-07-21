import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAddContactMutation } from 'redux/contacts/contacts-slice';
import { toast } from 'react-toastify';
import { Form, Label, Button, Input, Loader } from './ContactForm.styled';

const ContactForm = ({ data }) => {
  const [name, setName] = useState('');
  const [mobilePhone, setPhone] = useState('');
  const names = data.map(({ name }) => name.toLowerCase());

  const [createContact, { isLoading }] = useAddContactMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (names.includes(name.toLowerCase())) {
      toast.error(`${name} is already in contacts`);
      reset();
      return;
    }
    createContact({ name, mobilePhone });
    reset();
    toast.success('Contact was added');
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          maxLength="30"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          mask="+ 999-99-99-99-999"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={mobilePhone}
          onChange={handleChange}
        />
      </Label>
      <Button type="submit">
        Add contact
        {isLoading && <Loader size={20} color="white" aria-label="loading" />}
      </Button>
    </Form>
  );
};

ContactForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
