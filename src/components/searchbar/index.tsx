// Note: This searchbar is currently a work in progress!
// It will continue to receive updates over the coming week!

import { AiOutlineSearch } from 'react-icons/ai';
import styles from './searchbar.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.searchbox}>
      <form className={styles.container}>
        <input type='text' placeholder='Search' />
        <button>
          <AiOutlineSearch size='35px' />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
