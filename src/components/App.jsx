import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
// import fetchImg from './utils/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './styles.module.css';
import Modal from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const BASE_URL = 'https://pixabay.com/api/?q=';
  const KEY = '32970540-84e885805fcb13ea237a5964c';
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [arrayImg, setArrayImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [activImg, setActivImg] = useState(0);

  useEffect(() => {
    if (search === '') {
      return;
    }

    function onSubmitbyQuery() {
      setStatus('loader');
      axios
        .get(
          `${BASE_URL}${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => response.data)
        .then(result => {
          setArrayImg(prevState => [...prevState, ...result.hits]);
          setStatus('loadMore');
          if (result.hits.length === 0) {
            setStatus(false);
            toast.error(`No search results ${search}`, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          }
          if (result.hits.length < 12) {
            setStatus(false);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(`${error}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        });
    }
    onSubmitbyQuery();
  }, [page, search]);

  const onSubmit = query => {
    if (search === query) {
      return;
    }
    if (query.trim() === '') {
      toast.error('Enter a request', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    setSearch(query);
    setArrayImg([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onActivImg = i => {
    setActivImg(
      arrayImg.filter(img => {
        return img.id === i;
      })
    );
  };

  return (
    <div className={css.App}>
      {<Searchbar onSubmit={onSubmit} />}
      {arrayImg.length > 0 && (
        <ImageGallery
          arrayImg={arrayImg}
          toggleModal={toggleModal}
          onActivImg={onActivImg}
        />
      )}
      {status === 'loader' && <Loader />}
      {status === 'loadMore' && <Button onButton={onLoadMore} />}
      {showModal && (
        <Modal toggleModal={toggleModal} activeImage={activImg[0]} />
      )}
      {
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      }
    </div>
  );
};

export default App;
