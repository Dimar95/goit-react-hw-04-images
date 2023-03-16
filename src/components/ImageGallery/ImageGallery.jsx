import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ toggleModal, onActivImg, arrayImg }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {arrayImg.map(img => {
          const { id, webformatURL } = img;
          return (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              onActivImg={onActivImg}
              toggleModal={toggleModal}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  arrayImg: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  onActivImg: PropTypes.func.isRequired,
};
