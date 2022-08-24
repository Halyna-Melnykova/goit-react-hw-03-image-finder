import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage }) => {
  return (
    <li className={s.galleryItem}>
      <img className={s.galleryImage} src={smallImage} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
