import styles from "./BuyButton.module.scss";
import React, { useEffect, useState, useMemo } from "react";
import { useFuelWeb3 } from "../../hooks/useFuelWeb3";
import { useIsConnected } from "../../hooks/useIsConnected";
import { ConnectButton } from "../connect-button/ConnectButton";
import { WalletLocked, bn, BN } from "fuels";
import { WebgumContractAbi__factory } from "../../contracts";
import { CONTRACT_ID } from "../../utils/contract-id";

interface BuyButtonProps {
  projectID: string | string[] | undefined;
}

export default function BuyButton({ projectID }: BuyButtonProps) {
  const isConnected = useIsConnected();
  const [FuelWeb3] = useFuelWeb3();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [accounts, setAccounts] = useState<Array<string>>([]);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await FuelWeb3.accounts();
      setAccounts(accounts);
    }
    if (FuelWeb3) getAccounts();
  }, [FuelWeb3]);

  const [contract, wallet] = useMemo(() => {
    if (FuelWeb3 && accounts[0]) {
      const wallet = new WalletLocked(accounts[0], FuelWeb3.getProvider());
      // Connects out Contract instance to the deployed contract
      // address using the given wallet.
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);

      return [contract, wallet];
    }
    return [null, null];
  }, [FuelWeb3, accounts]);

  async function buyProject() {
    if(typeof projectID == "string"){
      try {
        const { value } = await contract!.functions
          .buy_project(parseInt(projectID))
          .txParams({ gasPrice: 1 })
          .call();
        console.log("VALUE:", value);
        // setProjectID(value.project_id);
        
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
        alert("Success! You bought the project");
      }

    }
  }



  return (
    <div>
        <section>
          {isConnected ? (
            <>
            {!success ?
            <>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <button className={styles.buy_button} onClick={buyProject}>Buy Project</button>
              )}
              </>
              : 
              <>Success! You bought the project!</>
            }
            </>
          ) : (
            <ConnectButton />
          )}
        </section>
    </div>
  );
}
