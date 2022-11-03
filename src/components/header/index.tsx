import styles from "./header.module.scss";
import SearchIcon from "../../assets/search-interface-symbol.png";
import AccountIcon from "../../assets/User.png";
import ShoppingCartIcon from "../../assets/shopping-cart.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>
      <div className={styles.menus}>
        <button className={styles.sellBtn}>Start Selling</button>
        <div className={styles.menuWrapper}>
          <Image src={AccountIcon} objectFit="cover" layout="fill" />
        </div>
        <div className={styles.menuWrapper}>
          <Image src={ShoppingCartIcon} objectFit="cover" layout="fill" />
        </div>
        <div className={styles.menuWrapper}>
          <Image src={SearchIcon} objectFit="cover" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default Header;
