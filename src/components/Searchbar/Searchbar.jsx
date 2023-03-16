import React from 'react';
import css from '../styles.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ handleChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  handleChange = e => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <header className={css.Searchbar}>
      <form
        className={css.SearchForm}
        onSubmit={e => {
          e.preventDefault();
          if (inputValue.trim()) {
          }
          onSubmit(inputValue.trim());
        }}
      >
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          value={inputValue}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
