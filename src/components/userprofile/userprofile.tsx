import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import styles from "./userprofile.module.scss";
import { useIsConnected } from "../../hooks/useIsConnected";
import { useFuelWeb3 } from "../../hooks/useFuelWeb3";
import { ConnectButton } from "../connect-button/ConnectButton";
import AllProducts from "../allproducts";
import BuyHistory from "../buyhistory";
import ItemsOnSale from "../items-onsale";
import { WalletLocked, bn, BN, Address } from "fuels";
import { WebgumContractAbi__factory } from "../../contracts"
import { CONTRACT_ID } from "../../utils/contract-id";
import { IdentityInput, AddressInput, VectorOutput, WebgumContractAbi } from "../../contracts/WebgumContractAbi";

const UserProfile = () => {
  const [tab, setTab] = useState(1);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [creatorVector, setCreatorVector] = useState<VectorOutput>()
  const [buyerVector, setBuyerVector] = useState<VectorOutput>()
  const [webgumContract, setWebgumContract] = useState<WebgumContractAbi>()
  const [FuelWeb3] = useFuelWeb3();
  const isConnected = useIsConnected();

  async function getUserInfo(fuelAccounts: any[]){
    try{
      const wallet = new WalletLocked(fuelAccounts[0], FuelWeb3.getProvider());
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);
      setWebgumContract(contract)
      let b256 = new Address(fuelAccounts[0]).toB256();
      let address: AddressInput = { value: b256};
      let id: IdentityInput = { Address: address };

      // get the project ids created by the user's account
      let resp = await contract!
      .functions
      .get_creator_vector(id)
      .get();
      console.log("CREATOR VECTOR", resp.value)
      setCreatorVector(resp.value);

      // get the project ids bought by the user's account
      resp = await contract!
      .functions
      .get_buyer_vector(id)
      .get();
      console.log("BUYER VECTOR", resp.value)
      setBuyerVector(resp.value);

    } catch (error){
      console.log("ERROR:", error);
    }
  }
  
  useEffect(() => {
    async function getAccounts() {
      const fuelAccounts = await FuelWeb3.accounts();
      setAccounts(fuelAccounts);
      await getUserInfo(fuelAccounts)
    }
    if (FuelWeb3 && isConnected) getAccounts();
  }, [FuelWeb3, isConnected]);

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
            {tab === 1 && <AllProducts contract={contract} creatorVector={creatorVector} />}
            {tab === 2 && <ItemsOnSale />}
            {tab === 3 && <BuyHistory contract={contract} buyerVector={buyerVector} />}
          </main>
        </div>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default UserProfile;
