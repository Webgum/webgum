import type { NextPage } from "next";
import styles from "./categories.module.scss";
import BookCat from "../../assets/bookcat.png";
import Image from "next/image";
import BookIcon from "../../assets/3D.svg";

const Categories = () => {
  const categories = [
    {
      title: "Made By Experts",
      description: "Lorem ipsum dolor sit amet consectetur",
      image: "link to image here",
      tags: ["notion", "figma", "sketch"],
    },
    {
      title: "lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur",
      image: "link to image here",
      tags: ["notion", "figma", "sketch"],
    },
    {
      title: "dolor sit amet",
      description: "Lorem ipsum dolor sit amet consectetur",
      image: "link to image here",
      tags: ["notion", "figma", "sketch"],
    },
    {
      title: "consectetur",
      description: "Lorem ipsum dolor sit amet consectetur",
      image: "link to image here",
      tags: ["notion", "figma", "sketch"],
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.typo}>
        <div className={styles.heading}>
          <div>
            <h1 className={styles.title}>Categories</h1>
            <h2 className={styles.sub}>
              Find your perfect product just got easier!
            </h2>
          </div>
          <div>
            {" "}
            <Image
              src={BookCat}
              alt="a cat lying on books"
              height={200}
              width={200}
            />
          </div>
        </div>
        <div className={styles.cards}>
          {categories.map((category) => (
            <div key={category.title} className={styles.card}>
              <div className={styles.cardSvg}>
                <Image src={BookIcon} alt="book icon" height={50} width={50} />
              </div>
              <div className={styles.cardTitle}>
                <p>{category.title}</p>
              </div>
              <div className={styles.cardDescription}>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Categories;