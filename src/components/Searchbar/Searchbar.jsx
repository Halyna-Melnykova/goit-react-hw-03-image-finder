import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static defaultProps = {
    onSubmit: () => {},
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    search: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      alert(`enter word for search`);
      return;
    }
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }
  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={s.searchbar}>
        <form onSubmit={handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            name="search"
            value={search}
            onChange={handleChange}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
