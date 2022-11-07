import styles from './header.module.scss';
import SearchIcon from '../../assets/search-interface-symbol.png';
import AccountIcon from '../../assets/user.png';
import Image from 'next/image';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>

      <div className={styles.menus}>
        <button className={styles.sellBtn}>Start Selling</button>
        <div className={styles.menuWrapper}>
          {/* <Image src={AccountIcon} objectFit='cover' layout='fill' /> */}
          <AiOutlineUser size='35px' />
        </div>
        <div className={styles.menuWrapper}>
          {/* <Image src={ShoppingCartIcon} objectFit='cover' layout='fill' /> */}
          <AiOutlineShoppingCart size='35px' />
        </div>
        <div className={styles.menuWrapper}>
          {/* <Image src={SearchIcon} objectFit='cover' layout='fill' /> */}
          <AiOutlineSearch size='35px' />
        </div>
      </div>
    </div>
  );
};

export default Header;
