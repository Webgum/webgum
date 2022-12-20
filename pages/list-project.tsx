import React, { useEffect, useState, useMemo } from "react";
import { useFuelWeb3 } from "../src/hooks/useFuelWeb3";
import { useIsConnected } from "../src/hooks/useIsConnected";
import { ConnectButton } from "../src/components/connect-button/ConnectButton";
import { WalletLocked, bn, BN } from "fuels";
import { WebgumContractAbi__factory } from "../src/contracts";
import { CONTRACT_ID } from "../src/utils/contract-id";
import styles from "../styles/ListProject.module.scss";
import { categories } from "../src/utils/categories";


export default function ListProject() {
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewPhotos, setPreviewPhotos] = useState<FileList | null>(null);
  const [price, setPrice] = useState("0");
  const [maxBuyers, setMaxBuyers] = useState("0");
  const isConnected = useIsConnected();
  const [FuelWeb3] = useFuelWeb3();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("");
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
      const contract = WebgumContractAbi__factory.connect(CONTRACT_ID!, wallet);

      return [contract, wallet];
    }
    return [null, null];
  }, [FuelWeb3, accounts]);

  async function listProject(cid: string) {
    try {
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
    if (wallet) {
      setLoading(true);
      try {
        let balance = await wallet.getBalance();
        if (!balance.gt(0)) {
          alert(
            "You need to get test funds from the Fuel faucet: https://faucet-beta-2.fuel.network/"
          );
          return;
        }
        if (files == null || previewPhotos == null) {
          alert("You are missing files");
        } else {
          let filesArray = [];
          let previewsArray = [];
          for (let i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
          }
          for (let i = 0; i < previewPhotos.length; i++) {
            previewsArray.push(previewPhotos[i]);
          }
          let cid = await uploadFiles(filesArray, previewsArray);
          console.log("uploaded, going to list", cid);
          // call the contract with this
          await listProject(cid);
        }
      } catch (error) {
        setLoading(false);
        alert(`ERROR: ${error}`);
      }
    }
  };

  async function uploadFiles(filesArray: File[], previews: File[]) {
    let formData = new FormData();
    filesArray.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    previews.forEach((file, index) => {
      formData.append(`preview${index}`, file);
    });
    formData.append("name", projectName);
    formData.append("description", description);
    formData.append("category", category);
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
        let responseJSON = await response.json();
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
          {isConnected ? (
            <div className={styles.container}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                  <h1>List a new project</h1>
                  <div className={styles.inputContainer}>
                    <label htmlFor="files-name">Project Name</label>
                    <div>
                      <input
                        id="files-name"
                        name="files-name"
                        type="text"
                        required
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
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
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="category">
                      Project Category
                    </label>
                    <div>
                    <select name="categories" id="categories" onChange={(e) => setCategory(e.target.value)}>
                      <option value="">(none)</option>
                      <option value={categories[0].title}>{categories[0].title}</option>
                      <option value={categories[1].title}>{categories[1].title}</option>
                      <option value={categories[2].title}>{categories[2].title}</option>
                      <option value={categories[3].title}>{categories[3].title}</option>
                    </select>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="preview-photos">Preview Photos</label>
                    <div>
                      <input
                        type="file"
                        id="preview-photos"
                        multiple
                        required
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setPreviewPhotos(e.target.files);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="files">Project Files</label>
                    <div>
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
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
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

                  <div className={styles.inputContainer}>
                    <label htmlFor="max-buyers">
                      Max Buyers (set to 0 if unlimited)
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

                  <div>
                    <button type="submit">List Project</button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <ConnectButton />
          )}
        </section>
      ) : (
        <div>Your item is listed! The project id is {projectID.format()}</div>
      )}
    </div>
  );
}
