import styles from "./header.module.scss";
import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";
import MobileMenu from "../mobilemenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>
      <div>
        <div className={styles.menus}>
          <Link href="/user">
            <button className={styles.sellBtn}>Start Selling</button>
          </Link>

          {/* <Link href="/register">
            <AiOutlineUser size="35px" />
          </Link>
          <AiOutlineShoppingCart size="35px" /> */}
          <AiOutlineSearch size="35px" />
        </div>

        <div className={styles.hamburgerContainer}>
          <input
            type="checkbox"
            id="checkbox"
            className={`${styles.checkbox} ${styles.visuallyHidden}`}
            onClick={() => setIsOpen(!isOpen)}
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
        {isOpen && <MobileMenu />}
      </div>
    </div>
  );
};

export default Header;
