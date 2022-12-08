import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./mobilemenu.module.scss";

const MobileMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>webgum</div>
      <div className={styles.menucontainer}>
        <Link href="">
          <div className={styles.menu}>
            Search <AiOutlineSearch size="25px" />
          </div>
        </Link>
        <Link href="/register">
          <div className={styles.menu}>
            Register <AiOutlineUser size="25px" />
          </div>
        </Link>
        <Link href="/login">
          <div className={styles.menu}>
            Login <AiOutlineUser size="25px" />
          </div>
        </Link>
        {/* <button className={styles.sellBtn}>Start Selling</button> */}
      </div>
    </div>
  );
};

export default MobileMenu;
