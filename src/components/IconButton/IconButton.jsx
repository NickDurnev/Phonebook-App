import PropTypes from 'prop-types';
import Wrap from './IconButton.styled';

const IconButton = ({ children, onClick, width = '100%' }) => (
  <Wrap type="button" onClick={onClick} width={width}>
    {children}
  </Wrap>
);

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string,
};

export default IconButton;
