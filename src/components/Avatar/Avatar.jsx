import PropTypes from 'prop-types';
import { Wrap, Icon, DefaultIcon } from './Avatar.styled';

const Avatar = ({ imageURL, width }) => {
  return (
    <Wrap width={width}>
      {imageURL ? <Icon src={imageURL} /> : <DefaultIcon size="100" />}
    </Wrap>
  );
};

Avatar.propTypes = {
  imageURL: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export default Avatar;
