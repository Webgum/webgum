import styles from "./header.module.scss";

import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>

      <div className={styles.menus}>
        <button className={styles.sellBtn}>Start Selling</button>
        <AiOutlineUser size="35px" />
        <AiOutlineShoppingCart size="35px" />
        <AiOutlineSearch size="35px" />
      </div>
    </div>
  );
};

export default Header;
