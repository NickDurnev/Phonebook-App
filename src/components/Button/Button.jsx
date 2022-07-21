import PropTypes from 'prop-types';
import Wrap from './Button.styled';

const Button = ({
  children,
  onClick,
  padding = '5px',
  position,
  positionX,
  positionY,
  bgColor = true,
}) => (
  <Wrap
    className={position && 'positioned'}
    type="button"
    onClick={onClick}
    padding={padding}
    position={position}
    positionX={positionX}
    positionY={positionY}
    bgColor={bgColor}
  >
    {children}
  </Wrap>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.string,
  position: PropTypes.string,
  positionX: PropTypes.string,
  positionY: PropTypes.string,
  bgColor: PropTypes.bool,
};

export default Button;
