import styles from "./BuyButton.module.scss";
import { useState, useEffect } from "react";

export default function BuyButton() {
  return (
    <div>
      <button
        className={styles.buy_button}
      >
        Buy Project
      </button>
    </div>
  );
}
