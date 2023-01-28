import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import {
  setModalOpen,
  setContactEditOpen,
} from '../../redux/isOpen/isOpen-actions';
import { Container } from './ContactList.styled';
import Contact from '../Contact';
import { IContact } from '../../services/interfaces';

interface IProps {
  data: IContact[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSetSkipQuery: (a: boolean) => void;
  animationTimeOut: number;
}

const ContactList: FC<IProps> = ({
  data,
  onDelete,
  onEdit,
  onSetSkipQuery,
  animationTimeOut,
}) => {
  const dispatch = useDispatch();

  const openModalAgreement = (id: string) => {
    dispatch(setModalOpen(true));
    onDelete(id);
  };

  const openContactInfo = (id: string) => {
    dispatch(setContactEditOpen(true));
    onEdit(id);
  };

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {data.map(item => (
          <Contact
            key={item._id}
            item={item}
            onDelete={_id => openModalAgreement(_id)}
            onEdit={_id => openContactInfo(_id)}
            onSetSkipQuery={onSetSkipQuery}
            animationTimeOut={animationTimeOut}
          />
        ))}
      </TransitionGroup>
    </Container>
  );
};

export default ContactList;
