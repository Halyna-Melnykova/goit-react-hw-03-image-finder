import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import s from './App.module.css';

class App extends Component {
  state = {
    search: '',
  };
  onSearch = ({ search }) => {
    this.setState({
      search,
    });
  };

  render() {
    const { onSearch } = this;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={onSearch} />
        <ImageGallery searchQuery={this.state.search} />
      </div>
    );
  }
}

export default App;
