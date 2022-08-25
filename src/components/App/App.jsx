import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import s from './App.module.css';

class App extends Component {
  state = {
    search: '',
    page: 1,
  };
  onSearch = ({ search }) => {
    this.setState({
      search,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { onSearch } = this;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={onSearch} />
        <ImageGallery
          searchQuery={this.state.search}
          page={this.state.page}
          loadMore={this.loadMore}
          resetPage={this.resetPage}
        />
      </div>
    );
  }
}

export default App;
