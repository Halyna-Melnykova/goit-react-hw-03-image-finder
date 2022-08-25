import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, largeImage, onClick }) => {
  return (
    <li className={s.galleryItem} onClick={() => onClick({ largeImage })}>
      <img className={s.galleryImage} src={smallImage} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
