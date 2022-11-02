import styles from "./header.module.scss";
import SearchIcon from "../../assets/search-interface-symbol.png";
import AccountIcon from "../../assets/user.png";
import ShoppingCartIcon from "../../assets/shopping-cart.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>
      <div className={styles.menus}>
        <button className={styles.sellBtn}>Start Selling</button>
        <Image src={AccountIcon} width={30} height={30} />
        <Image src={ShoppingCartIcon} width={30} height={30} />
        <Image src={SearchIcon} width={30} height={30} />
      </div>
    </div>
  );
};

export default Header;
