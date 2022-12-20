import styles from "./categories.module.scss";
import BookCat from "../../assets/bookcat.png";
import Image from "next/image";
import BookIcon from "../../assets/3D.svg";
import { useState } from "react";
import Link from "next/link";
import MockData from "../mockdata";
import { Button } from "@nextui-org/react";
import { categories } from "../../utils/categories";

const Categories = () => {
  const [category, setCategory] = useState(0);

  

  if (category === 0)
    return (
      <>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Categories</h1>
            <h2 className={styles.subTitle}>
              Finding your perfect product just got easier!
            </h2>
          </div>
          <div className={styles.cards}>
            {categories.map((category) => (
              <div key={category.id} className={styles.cardItems}>
                <div
                  className={styles.card}
                  onClick={() => setCategory(category.id)}
                >
                  <div className={styles.cardSvg}>
                    <Image
                      src={BookIcon}
                      alt="book icon"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className={styles.cardTexts}>
                    <div className={styles.cardTitle}>
                      <p>{category.title}</p>
                    </div>
                    <div className={styles.cardDescription}>
                      <p>{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  else if (category === 1) {
    return (
      <>
        <Button
          bordered
          auto
          ghost
          color="primary"
          onClick={() => setCategory(0)}
          css={{
            margin: "1rem",
          }}
        >
          Back
        </Button>
        <MockData />
      </>
    );
  } else if (category === 2) {
    return (
      <>
        <Button
          bordered
          auto
          ghost
          color="secondary"
          onClick={() => setCategory(0)}
          css={{
            margin: "1rem",
          }}
        >
          Back
        </Button>
        <MockData />
      </>
    );
  } else if (category === 3) {
    return (
      <>
        <Button
          bordered
          auto
          ghost
          color="secondary"
          onClick={() => setCategory(0)}
          css={{
            margin: "1rem",
          }}
        >
          Back
        </Button>
        <MockData />
      </>
    );
  } else if (category === 4) {
    return (
      <>
        <Button
          bordered
          auto
          ghost
          color="secondary"
          onClick={() => setCategory(0)}
          css={{
            margin: "1rem",
          }}
        >
          Back
        </Button>
        <MockData />
      </>
    );
  } else {
    return (
      <main className={styles.main}>
        <div className={styles.heading}>
          <div>
            <h1 className={styles.title}>Categories</h1>
            <h2 className={styles.subTitle}>
              Finding your perfect product just got easier!
            </h2>
          </div>
          <div>
            {/* {" "}
  <Image
    src={BookCat}
    alt="a cat lying on books"
    height={200}
    width={200}
  /> */}
          </div>
        </div>
        <div className={styles.cards}>
          {categories.map((category) => (
            <div key={category.id} className={styles.cardItems}>
              <div
                className={styles.card}
                onClick={() => setCategory(category.id)}
              >
                <div className={styles.cardSvg}>
                  <Image
                    src={BookIcon}
                    alt="book icon"
                    height={50}
                    width={50}
                  />
                </div>
                <div className={styles.cardTexts}>
                  <div className={styles.cardTitle}>
                    <p>{category.title}</p>
                  </div>
                  <div className={styles.cardDescription}>
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
};
export default Categories;
