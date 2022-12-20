import BuyButton from "../../src/components/buy-button/BuyButton";
import Download from "../../src/components/download/Download";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { WalletLocked, BN } from "fuels";
import { WebgumContractAbi__factory } from "../../src/contracts";
import { ProjectOutput } from "../../src/contracts/WebgumContractAbi";
import { useIsConnected } from "../../src/hooks/useIsConnected";
import { useFuelWeb3 } from "../../src/hooks/useFuelWeb3";
import { ConnectButton } from "../../src/components/connect-button/ConnectButton";
import { CONTRACT_ID } from "../../src/utils/contract-id";

export default function Project() {
  const [project, setProject] = useState<ProjectOutput>();
  const [ipfsData, setIpfsData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const isConnected = useIsConnected();
  const router = useRouter();
  const { id } = router.query;

  const [FuelWeb3] = useFuelWeb3();
  const [accounts, setAccounts] = useState<Array<string>>([]);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await FuelWeb3.accounts();
      console.log("ACCOUNTS", accounts)
      setAccounts(accounts);
      await getProjectInfo();
    }

    async function getProjectInfo() {
      try {
          let inputID = parseInt(id as string);
          const wallet = new WalletLocked(accounts[0], FuelWeb3.getProvider());
          const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);
          console.log("INPUT ID", inputID)
          console.log("CONTRACT:", contract!.functions)
          let resp = await contract!.functions
            .get_project(inputID)
            .simulate()
          console.log("RESP", resp)
          // setProject(resp.value);
          // const ipfsResp = await fetch(
          //   `https://ipfs.io/ipfs/${resp.value.metadata}/data.json`
          // );
          // const json = await ipfsResp.json();
          // setIpfsData(json);
          // setLoading(false);
        } catch (error) {
          console.log("ERROR: ", error);
          setLoading(false);
        }
    }

    if (FuelWeb3 && typeof id == "string") getAccounts();

  }, [FuelWeb3, id]);

  

  return (
    <div>
      {accounts.length > 0 ? ( 
      <div>
        {project ? (
          <div>
            <div>Buyer Count: {project.buyer_count.format()}</div>
            <div>Max Buyers: {project.max_buyers.format()}</div>
            <div>Price: {project.price.format()}</div>
            <div>IPFS CID: {project.metadata}</div>
            <div>Owner address: {project.owner_address.Address?.value}</div>
            {ipfsData && (
              <div>
                {ipfsData.name && <div>Name: {ipfsData.name}</div>}
                {ipfsData.description && (
                  <div>Description: {ipfsData.description} </div>
                )}
                <Download cid={project.metadata} />
              </div>
            )}
  
            <BuyButton projectID={id} />
          </div>
        ) : <div>{loading && <div> Loading... </div>}</div>}

      </div>
      )
      :
      <div>
        <ConnectButton/>
      </div>
}

    </div>
  );
}
