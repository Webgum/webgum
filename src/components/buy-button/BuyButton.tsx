import { Abi } from "../../contracts";
import styles from "./BuyButton.module.scss";

interface BuyButtonProps {
  projectID: string | string[] | undefined;
}

//TODO: connect contract through the Fuel wallet

export default function BuyButton({ projectID }: BuyButtonProps) {
  async function buyProject() {
    if (typeof projectID == "string") {
      let id = parseInt(projectID);
      // call the buy_project function from with the user's wallet
    }
  }

  return (
    <div>
      <button className={styles.buy_button} onClick={buyProject}>
        Buy Project
      </button>
    </div>
  );
}
