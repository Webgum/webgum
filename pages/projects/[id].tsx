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
import { getLinks } from "../../src/utils/ipfs";
import Image from "next/image";

export default function Project() {
  const [project, setProject] = useState<ProjectOutput>();
  const [ipfsData, setIpfsData] = useState<any>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const isConnected = useIsConnected();
  const router = useRouter();
  const { id } = router.query;

  const [FuelWeb3] = useFuelWeb3();
  const [accounts, setAccounts] = useState<Array<string>>([]);

  async function getIPFSData(cid: string) {
    const ipfsResp = await fetch(`https://${cid}.ipfs.w3s.link/data.json`);
    const json = await ipfsResp.json();
    setIpfsData(json);

    const links = await getLinks(cid);
    let previewLinks: any[] = [];
    links.forEach((link) => {
      if (link.name.startsWith("preview")) {
        let paths = link.path.split("/");
        // console.log("PATHS", paths)
        previewLinks.push(`https://${paths[0]}.ipfs.w3s.link/${paths[1]}`);
      }
    });
    setPreviewImages(previewLinks);
  }

  async function getProjectInfo() {
    try {
      let inputID = parseInt(id as string);
      const wallet = new WalletLocked(accounts[0], FuelWeb3.getProvider());
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);
      // console.log("INPUT ID", inputID);
      // console.log("CONTRACT:", contract!.functions);
      let { value } = await contract!.functions.get_project(inputID).get();
      setProject(value);
      await getIPFSData(value.metadata);
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
              <div>
                Buyer Count:{" "}
                {parseFloat(project.buyer_count.format()) * 1_000_000_000}
              </div>
              <div>
                Max Buyers:{" "}
                {parseFloat(project.max_buyers.format()) * 1_000_000_000 == 0
                  ? "Unlimited"
                  : parseFloat(project.max_buyers.format()) * 1_000_000_000}
              </div>
              <div>Price: {project.price.formatUnits()}</div>
              <div>IPFS CID: {project.metadata}</div>
              <div>Owner address: {project.owner_address.Address?.value}</div>
              {previewImages.length > 0 && (
                <div
                  style={{
                    width: "250px",
                    height: "250px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={previewImages[0]}
                    alt="project image"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              )}
              {ipfsData && (
                <div>
                  {ipfsData.name && <div>Name: {ipfsData.name}</div>}
                  {ipfsData.description && (
                    <div>Description: {ipfsData.description} </div>
                  )}
                  {ipfsData.category && (
                    <div>Category: {ipfsData.category}</div>
                  )}
                  {/* <Download cid={project.metadata} /> */}
                </div>
              )}

              <BuyButton contract={contract} projectID={id} />
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
