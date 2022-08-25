import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, largeImage, onClick }) => {
  return (
    <li className={s.galleryItem} onClick={() => onClick({ largeImage })}>
      <img className={s.galleryImage} src={smallImage} alt="img" />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,

  onClick: PropTypes.func,
};
