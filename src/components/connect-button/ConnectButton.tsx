import { useFuelWeb3 } from "../../hooks/useFuelWeb3";
import styles from "./ConnectButton.module.scss";
import { useState, useEffect } from "react";

export function ConnectButton() {
const [isMounted, setIsMounted] = useState(false)
const [FuelWeb3] = useFuelWeb3();

 useEffect(() => {
    setIsMounted(true)
 }, [])

 return (
    <div>
        {FuelWeb3 && isMounted && 
            <button className={styles.connect_button} onClick={() => FuelWeb3.connect()}>
                Connect Wallet
            </button>
        }
        {!FuelWeb3 && isMounted && <div> Download the Fuel Wallet to use the app.</div>}
    </div>
 )
}