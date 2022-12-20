import styles from "./BuyButton.module.scss";
import React, { useState } from "react";
import { WebgumContractAbi } from "../../contracts";

interface BuyButtonProps {
  projectID: string | string[] | undefined;
  contract: WebgumContractAbi | null;
}

export default function BuyButton({ projectID, contract }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function buyProject() {
    if (typeof projectID == "string") {
      try {
        await contract!.functions
          .buy_project(parseInt(projectID))
          .txParams({ gasPrice: 1, variableOutputs: 1 })
          .call();
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
        setSuccess(true);
        alert("Success! You bought the project");
      }
    }
  }

  return (
    <div>
      <section>
        {!success ? (
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <button className={styles.buy_button} onClick={buyProject}>
                Buy Project
              </button>
            )}
          </>
        ) : (
          <>Success! You bought the project!</>
        )}
      </section>
    </div>
  );
}
