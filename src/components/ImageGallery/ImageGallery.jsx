import { Component } from 'react';
import { getPhotos } from '../../api/gallary';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.modyule.css';

class ImageGallery extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    const { page } = this.state;

    if (prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { page } = this.state;
    this.setState({
      loading: true,
    });

    try {
      const data = await getPhotos(page);
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

    // const elements = items.map(({ id, title }) => <li key={id}>{title}</li>);

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
        {isPosts && <button onClick={loadMore}>load more</button>}
      </>
    );
  }
}

export default ImageGallery;
