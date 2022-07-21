import PropTypes from 'prop-types';
import avatars from 'avatars/avatars';
import List from './AvatarList.styled';

const AvatarList = ({ onClick }) => {
  return (
    <List onClick={e => onClick(e.target.id)}>
      {avatars.map((avatar, index) => (
        <li key={index}>
          <img src={avatar} alt="Logo" id={index} />
        </li>
      ))}
    </List>
  );
};

AvatarList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AvatarList;
