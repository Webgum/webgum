import React, { useEffect, useState, useMemo } from "react";
import styles from "./list-project.module.scss";
import { useFuelWeb3 } from "../../hooks/useFuelWeb3";
import { useIsConnected } from "../../hooks/useIsConnected";
import { ConnectButton } from "../connect-button/ConnectButton";
import { FiUpload } from "react-icons/fi";
import { WalletLocked, bn, BN } from "fuels";
import { Abi__factory } from "../../contracts";

// The address of the contract deployed the Fuel testnet
const CONTRACT_ID =
  "0x53c0c766088af9bd9b0cec7499c9375fbb9896336f0873ea361208bc1e44418d";

export default function ListProject() {
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [price, setPrice] = useState("0");
  const [maxBuyers, setMaxBuyers] = useState("0");
  const isConnected = useIsConnected();
  const [FuelWeb3] = useFuelWeb3();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [projectID, setProjectID] = useState<BN>();

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
      const contract = Abi__factory.connect(CONTRACT_ID, wallet);

      return [contract, wallet];
    }
    return [null, null];
  }, [FuelWeb3, accounts]);

  async function listProject(cid: string) {
    // console.log("listing project");
    try {
      // console.log("listing a new project..");
      const priceInput = bn.parseUnits(price.toString());
      const { value } = await contract!.functions
        .list_project(priceInput, maxBuyers, cid)
        .txParams({ gasPrice: 1 })
        .call();
      // console.log("VALUE:", value);
      setProjectID(value.project_id);
      alert("Item Listed");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (files == null) {
      alert("You are missing files");
    } else {
      let filesArray = [];
      for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
      }
      let cid = await uploadFiles(filesArray);
      // console.log("uploaded, going to list");
      // call the contract with this
      await listProject(cid);
    }
  };

  async function uploadFiles(filesArray: File[]) {
    let formData = new FormData();
    filesArray.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append("name", projectName);
    formData.append("description", description);
    let cid = await uploadToIPFS(formData);
    return cid;
  }

  async function uploadToIPFS(formData: FormData) {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.status !== 200) {
        console.log("ERROR", response);
      } else {
        // console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        // console.log("CID:", responseJSON.cid);
        return responseJSON.cid;
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  return (
    <div>
      {!projectID ? (
        <section>
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className={styles.container}>
                <h1>List Your Project</h1>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                  <div>
                    <label htmlFor="files-name">Project Name</label>
                    <div>
                      <input
                        id="files-name"
                        name="files-name"
                        type="text"
                        required
                        value={projectName}
                        placeholder="Name of Project"
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="files-description">
                      Project Description
                    </label>
                    <div>
                      <input
                        id="files-description"
                        name="files-description"
                        type="text"
                        required
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.fileInput}>
                    <label htmlFor="files">
                      Upload Project Files
                      <FiUpload size="20px"/>
                      <input
                        type="file"
                        id="files"
                        multiple
                        required
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFiles(e.target.files);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className={styles.flexDiv}>
                    <div>
                      <label htmlFor="price">Price</label>
                      <div>
                        <input
                          type="number"
                          id="price"
                          required
                          min="0"
                          step="any"
                          inputMode="decimal"
                          placeholder="0.00"
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="max-buyers">
                        Max Buyers (set to 0 if unliited)
                      </label>
                      <div>
                        <input
                          type="number"
                          id="max-buyers"
                          required
                          min="0"
                          step="1"
                          onChange={(e) => {
                            setMaxBuyers(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button type="submit">List Project</button>
                  </div>
                </form>
              </div>
            )}
          </>
        </section>
      ) : (
        <div>Your item is listed! The project id is {projectID.format()}</div>
      )}
    </div>
  );
}
