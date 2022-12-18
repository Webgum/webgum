import { useIsConnected } from "../../hooks/useIsConnected";
import Link from "next/link";
import styles from "./userprofile.module.scss";
import { ConnectButton } from "../connect-button/ConnectButton";

const UserProfile = () => {
  const isConnected = useIsConnected();
  return (
    <>
      {isConnected ? (
        <div className={styles.container}>
          <header>
            <h1>Profile</h1>
            <Link href="/list-project">
              <button>List Product</button>
            </Link>
          </header>
          <main>
            <div className={styles.btns}>
              <button>All Products</button>
              <button>Items on Sale</button>
              <button>History</button>
            </div>
          </main>
        </div>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default UserProfile;
