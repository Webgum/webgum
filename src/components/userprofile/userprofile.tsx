import Link from "next/link";
import { useState } from "react";
import styles from "./userprofile.module.scss";
import { useIsConnected } from "../../hooks/useIsConnected";
import { ConnectButton } from "../connect-button/ConnectButton";
import AllProducts from "../allproducts";
import BuyHistory from "../buyhistory";
import ItemsOnSale from "../items-onsale";

const UserProfile = () => {
  const isConnected = useIsConnected();
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  return (
    <>
      {isConnected ? (
        <div className={styles.container}>
          <header>
            <h1>Profile</h1>
            <Link href="/list-project">
              <button className={styles.headerBtn}>List Product</button>
            </Link>
          </header>
          <main>
            <div className={styles.btns}>
              <button
                onClick={() => setActive1(!active1)}
                className={active1 ? styles.clickedBtn : ""}
              >
                All Products
              </button>

              <button
                onClick={() => setActive2(!active2)}
                className={active2 ? styles.clickedBtn : ""}
              >
                Items on Sale
              </button>
              <button
                onClick={() => setActive3(!active3)}
                className={active3 ? styles.clickedBtn : ""}
              >
                History
              </button>
            </div>
            {active1 && <AllProducts />}
            {active2 && <ItemsOnSale/>}
            {active3 && <BuyHistory />}
          </main>
        </div>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default UserProfile;
