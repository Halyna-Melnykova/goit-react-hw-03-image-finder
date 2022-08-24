import s from './Button.module.css';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={s.button}>
      {text}
    </button>
  );
};

export default Button;
