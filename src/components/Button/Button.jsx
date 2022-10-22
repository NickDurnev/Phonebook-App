import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Wrap from './Button.styled';

const Button = forwardRef(
  ({ children, onClick, padding = '5px', bgColor = true }, ref) => (
    <Wrap
      type="button"
      onClick={onClick}
      padding={padding}
      bgColor={bgColor}
      ref={ref}
    >
      {children}
    </Wrap>
  )
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.string,
  bgColor: PropTypes.bool,
};

export default Button;
