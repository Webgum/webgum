import BuyButton from "../../src/components/buy-button/BuyButton";
import Download from "../../src/components/download/Download";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { WalletUnlocked } from "fuels";
import { Abi__factory } from "../../src/contracts";
import { ProjectOutput } from "../../src/contracts/Abi";

const CONTRACT_ID =
  "0x53c0c766088af9bd9b0cec7499c9375fbb9896336f0873ea361208bc1e44418d";
// address fuel1f00qvwjdemp4749542ltk3mz6ptldy2lng66hq7sjues6q9tfv6q08xwrg
const WALLET_SECRET =
  "0x3ea0c3e0f90e1a53b816934a0d5ac1b6b6a848181216aeedf958d70b6aefc531";

const wallet = new WalletUnlocked(
  WALLET_SECRET,
  "https://node-beta-2.fuel.network/graphql"
);

export default function Project() {
  const [project, setProject] = useState<ProjectOutput>();
  const [ipfsData, setIpfsData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const contract = Abi__factory.connect(CONTRACT_ID, wallet);

  useEffect(() => {
    async function getProjectInfo() {
      if (typeof id == "string") {
        try {
          let inputID = parseInt(id);
          let resp = await contract.functions
            .get_project(inputID)
            .txParams({ gasPrice: 1 })
            .call();
          setProject(resp.value);
          const ipfsResp = await fetch(
            `https://ipfs.io/ipfs/${resp.value.metadata}/data.json`
          );
          const json = await ipfsResp.json();
          setIpfsData(json);
          setLoading(false);
        } catch (error) {
          console.log("ERROR: ", error);
        }
      }
    }
    getProjectInfo();
  }, [id]);

  return (
    <div>
      {loading && <div> Loading... </div>}
      {project && (
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
      )}
    </div>
  );
}
