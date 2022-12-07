import styles from "./header.module.scss";

import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>
      <div>
        <div className={styles.menus}>
          <button className={styles.sellBtn}>Start Selling</button>
          <Link href="/register">
            <AiOutlineUser size="35px" />
          </Link>
          <AiOutlineShoppingCart size="35px" />
          <AiOutlineSearch size="35px" />
        </div>

        <div className={styles.hamburgerContainer}>
          <input
            type="checkbox"
            id="checkbox"
            className={`${styles.checkbox} ${styles.visuallyHidden}`}
          />
          <label htmlFor="checkbox">
            <div className={styles.hamburger}>
              <span className={`${styles.bar} ${styles.bar1}`}></span>
              <span className={`${styles.bar} ${styles.bar2}`}></span>
              <span className={`${styles.bar} ${styles.bar3}`}></span>
              <span className={`${styles.bar} ${styles.bar4}`}></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
