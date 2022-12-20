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
  const [tab, setTab] = useState(1);

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
                onClick={() => setTab(1)}
                className={tab === 1 ? styles.clickedBtn : ""}
              >
                All Products
              </button>

              <button
                onClick={() => setTab(2)}
                className={tab === 2 ? styles.clickedBtn : ""}
              >
                Items on Sale
              </button>
              <button
                onClick={() => setTab(3)}
                className={tab === 3 ? styles.clickedBtn : ""}
              >
                History
              </button>
            </div>
            {tab === 1 && <AllProducts />}
            {tab === 2 && <ItemsOnSale />}
            {tab === 3 && <BuyHistory />}
          </main>
        </div>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default UserProfile;
