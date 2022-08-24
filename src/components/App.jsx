import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    search: '',
  };
  onSearch = ({ search }) => {
    this.setState({
      search,
    });
    console.log(search);
  };

  render() {
    const { onSearch } = this;
    return (
      <>
        <Searchbar onSubmit={onSearch} />
        <ImageGallery searchQuery={this.state.search} />
      </>
    );
  }
}

export default App;
