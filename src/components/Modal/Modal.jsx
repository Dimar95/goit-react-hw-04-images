import css from '../styles.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ activeImage, toggleModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  const { largeImageURL, tags } = activeImage;

  return (
    <div className={css.Overlay} onClick={onClickBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  activeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
