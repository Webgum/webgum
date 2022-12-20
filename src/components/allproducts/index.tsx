import Image from "next/image";
import styles from "./allproducts.module.scss";
import { AiFillStar } from "react-icons/ai";
import HeroImage from "../../assets/herosection.png";

const AllProducts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <Image src={HeroImage} objectFit="cover" layout="fill" />
        </div>
        <div className={styles.cardDetails}>
          <p>Gucci Louis Vou Bag</p>
          <div className={styles.btmDetails}>
            <div className={styles.review}>
              <AiFillStar size="15px" />
              4.9 (856)
            </div>
            <div>$100</div>
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <Image src={HeroImage} objectFit="cover" layout="fill"/>
        </div>
        <div className={styles.cardDetails}>
          <p>Gucci Louis Vou Bag</p>
          <div className={styles.btmDetails}>
            <div className={styles.review}>
              <AiFillStar size="15px" />
              4.9 (856)
            </div>
            <div>$100</div>
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <Image src={HeroImage} objectFit="cover" layout="fill"/>
        </div>
        <div className={styles.cardDetails}>
          <p>Gucci Louis Vou Bag</p>
          <div className={styles.btmDetails}>
            <div className={styles.review}>
              <AiFillStar size="15px" />
              4.9 (856)
            </div>
            <div>$100</div>
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <Image src={HeroImage} objectFit="cover" layout="fill"/>
        </div>
        <div className={styles.cardDetails}>
          <p>Gucci Louis Vou Bag</p>
          <div className={styles.btmDetails}>
            <div className={styles.review}>
              <AiFillStar size="15px" />
              4.9 (856)
            </div>
            <div>$100</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
