import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={s.galleryItem}>
      <img src={image} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
