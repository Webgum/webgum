import BuyButton from "../../src/components/buy-button/BuyButton";
import Download from "../../src/components/download/Download";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { WalletLocked, bn, BN } from "fuels";
import { WebgumContractAbi__factory } from "../../src/contracts";
import { ProjectOutput } from "../../src/contracts/WebgumContractAbi";
import { useIsConnected } from "../../src/hooks/useIsConnected";
import { useFuelWeb3 } from "../../src/hooks/useFuelWeb3";
import { ConnectButton } from "../../src/components/connect-button/ConnectButton";
import { CONTRACT_ID } from "../../src/utils/contract-id";

export default function Project() {
  const [project, setProject] = useState<ProjectOutput>();
  const [ipfsData, setIpfsData] = useState<any>();
  const [previewImages, setPreviewImages] = useState();
  const [loading, setLoading] = useState(true);
  const isConnected = useIsConnected();
  const router = useRouter();
  const { id } = router.query;

  const [FuelWeb3] = useFuelWeb3();
  const [accounts, setAccounts] = useState<Array<string>>([]);

  async function getProjectInfo() {
    try {
      let inputID = parseInt(id as string);
      const wallet = new WalletLocked(accounts[0], FuelWeb3.getProvider());
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);
      console.log("INPUT ID", inputID);
      console.log("CONTRACT:", contract!.functions);
      let { value } = await contract!.functions.get_project(inputID).get();

      setProject(value);
      const ipfsResp = await fetch(
        `https://${value.metadata}.ipfs.w3s.link/data.json`
      );
      const json = await ipfsResp.json();
      setIpfsData(json);
     
      // TODO: fetch preview images
      
      setLoading(false);
    } catch (error) {
      console.log("ERROR: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getAccounts() {
      const accounts = await FuelWeb3.accounts();
      setAccounts(accounts);
      if (typeof id == "string" && project == null) {
        await getProjectInfo();
      }
    }
    if (FuelWeb3 && isConnected) getAccounts();
  }, [isConnected, id]);

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
                  {ipfsData.category && (
                    <div>Category: {ipfsData.category}</div>
                  )}
                  {/* {ipfsData.category && <div>Category: {ipfsData.category}</div>} */}
                  <Download cid={project.metadata} />
                </div>
              )}

              <BuyButton projectID={id} />
            </div>
          ) : (
            <div>{loading && <div> Loading... </div>}</div>
          )}
        </div>
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
