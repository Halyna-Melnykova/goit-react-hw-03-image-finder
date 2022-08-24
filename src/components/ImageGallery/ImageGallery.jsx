import { Component } from 'react';
import { searchPhotos } from '../../api/gallary';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
  };

  // componentDidMount() {
  //   this.fetchPhotos();
  // }

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if ((search && prevState.search !== search) || page > prevState.page) {
      this.fetchPhotos();
    }
  }

  async fetchPhotos() {
    const { search, page } = this.state;
    this.setState({
      loading: true,
    });

    try {
      const data = await searchPhotos(search, page);
      console.log(data.hits);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  render() {
    const { items, loading, error } = this.state;
    const { loadMore } = this;

    const isPosts = Boolean(items.length);

    return (
      <>
        <ul className={s.gallery}>
          {items.map(({ id, webformatURL }) => (
            <ImageGalleryItem key={id} image={webformatURL} />
          ))}
        </ul>
        {loading && <p>....Loading posts</p>}
        {error && <p>Не удалось загрузить посты</p>}
        {/* {isPosts && <button onClick={loadMore}>load more</button>} */}
        {isPosts && <Button onClick={loadMore} text="Load more" />}
      </>
    );
  }
}

export default ImageGallery;
