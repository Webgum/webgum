import { useState, useEffect, useMemo } from "react";
import ProjectCard from "../projectcard";
import { WalletLocked, bn, BN } from "fuels";
import { WebgumContractAbi__factory } from "../../contracts";
import { useIsConnected } from "../../hooks/useIsConnected";
import { useFuelWeb3 } from "../../hooks/useFuelWeb3";
import { ProjectOutput } from "../../contracts/WebgumContractAbi";
import { CONTRACT_ID } from "../../utils/contract-id";
import { ConnectButton } from "../connect-button/ConnectButton";
import styles from "./latest-projects.module.scss"

export default function LatestProjects() {
  const [projects, setProjects] = useState<ProjectOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState(0);
  const isConnected = useIsConnected();

  const [FuelWeb3] = useFuelWeb3();
  const [accounts, setAccounts] = useState<Array<string>>([]);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await FuelWeb3.accounts();
      setAccounts(accounts);
      await getProjects();
    }
    if (FuelWeb3 && isConnected) getAccounts();
  }, [isConnected, FuelWeb3]);

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

  async function getProjects() {
    try {
      const wallet = new WalletLocked(accounts[0], FuelWeb3.getProvider());
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);

      // get the total number of projects

      let { value } = await contract!.functions
        .get_projects_list_length()
        .get();

      let total = parseFloat(value.format()) * 1_000_000_000;
      console.log("TOTAL PROJECTS LISTED", total);
      setTotalProjects(total);

      // loop through to get the latest 10 projects
      let count = total;
      let limit = 0;
      if (count > 10) {
        limit = count - 10;
      }
      let tempProjects = [];
      while (count > limit) {
        console.log("counting down", count);
        let { value } = await contract!.functions.get_project(count).get();
        tempProjects.push(value);
        count--;
      }
      setProjects(tempProjects);
      setLoading(false);
    } catch (error) {
      console.log("ERROR: ", error);
      setLoading(false);
    }
  }

  return (
    <div>
      {isConnected ? (
        <div>
          {projects.length > 0 && (
            <div className={styles.projectsContainer}>
              {projects.map((proj) => {
                if (proj.metadata.startsWith("b")) {
                  return (
                    <ProjectCard
                      project={proj}
                      key={proj.project_id.format()}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
