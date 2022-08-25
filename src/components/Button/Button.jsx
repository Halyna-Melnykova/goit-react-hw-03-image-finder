import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={s.button}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
