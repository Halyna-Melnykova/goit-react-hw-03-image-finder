import { Component } from 'react';
import { searchPhotos } from '../../api/gallary';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    image: '',
  };

  // componentDidMount() {
  //   this.fetchPhotos();
  // }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchQuery } = this.props;

    if (
      (searchQuery && prevProps.searchQuery !== searchQuery) ||
      page > prevState.page
    ) {
      this.fetchPhotos();
    }
  }

  async fetchPhotos() {
    const { page } = this.state;
    const { searchQuery } = this.props;

    this.setState({
      loading: true,
    });

    try {
      const data = await searchPhotos(searchQuery, page);
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

  openModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      image: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      image: '',
    });
  };
  render() {
    const { items, loading, error, modalOpen, modalContent } = this.state;
    const { loadMore, openModal, closeModal } = this;

    const isPosts = Boolean(items.length);

    return (
      <>
        <ul className={s.gallery}>
          {items.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              // largeImage={largeImageURL}
              onClick={() => openModal({ largeImageURL })}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {error && <p>Erorr</p>}
        {isPosts && <Button onClick={loadMore} text="Load more" />}
        {modalOpen && <Modal close={closeModal}>{modalContent.image}</Modal>}
      </>
    );
  }
}

export default ImageGallery;

// onClick={() => onClick({title, body})}
