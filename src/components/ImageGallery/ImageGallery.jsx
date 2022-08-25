import { Component } from 'react';
import PropTypes from 'prop-types';
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
    // page: 1,
    modalOpen: false,
    image: '',
  };

  // componentDidMount() {
  //   this.fetchPhotos();
  // }

  componentDidUpdate(prevProps, prevState) {
    // const { page } = this.state;
    const { searchQuery, page } = this.props;

    if (searchQuery && prevProps.searchQuery !== searchQuery) {
      this.fetchPhotos();
    }

    if (page > prevProps.page) {
      this.fetchMorePhotos();
    }
  }

  async fetchPhotos() {
    const { searchQuery, page } = this.props;

    this.setState({
      loading: true,
    });

    try {
      const data = await searchPhotos(searchQuery, page);
      console.log(page);

      this.setState({
        items: [...data.hits],
      });
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  async fetchMorePhotos() {
    const { searchQuery, page } = this.props;

    this.setState({
      loading: true,
    });

    try {
      const data = await searchPhotos(searchQuery, page);

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

  openModal = image => {
    this.setState({
      modalOpen: true,
      image,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      image: '',
    });
  };
  render() {
    const { items, loading, error, modalOpen, image } = this.state;
    const { openModal, closeModal } = this;
    const { loadMore } = this.props;

    const isPhotos = Boolean(items.length);

    return (
      <>
        <ul className={s.gallery}>
          {items.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              onClick={openModal}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {error && <p>Erorr</p>}
        {isPhotos && <Button onClick={loadMore} text="Load more" />}
        {modalOpen && <Modal close={closeModal}>{image}</Modal>}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
