import { useState, useEffect } from "react";
import { ProjectOutput } from "../../contracts/WebgumContractAbi";
import styles from "./project-card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { getLinks } from "../../utils/ipfs";
import HeroImage from "../../assets/herosection.png";

interface IProjectCard {
  project: ProjectOutput;
}

export default function ProjectCard({ project }: IProjectCard) {
  const [ipfsData, setIpfsData] = useState<any>();
  const [previewImages, setPreviewImages] = useState<any[]>([]);

  //   console.log("PROJECT!", project);

  useEffect(() => {
    async function getIPFSData() {
      const ipfsResp = await fetch(
        `https://${project.metadata}.ipfs.w3s.link/data.json`
      );
      const json = await ipfsResp.json();
      setIpfsData(json);

      const links = await getLinks(project.metadata);
      let previewLinks: any[] = [];
      links.forEach((link) => {
        if (link.name.startsWith("preview")) {
          let paths = link.path.split("/");
          // console.log("PATHS", paths)
          previewLinks.push(`https://${paths[0]}.ipfs.w3s.link/${paths[1]}`);
        }
      });
      setPreviewImages(previewLinks);
    }
    if (project) {
      getIPFSData();
    }
  }, [project]);

  return (
    <div className={styles.container}>
      <Link
        href={`/projects/${parseFloat(project.project_id.format()) * 1_000_000_000}`}
      >
        <div className={styles.cardContainer}>
          <div className={styles.imgContainer}>
            {previewImages.length > 0 && (
              <Image
                src={previewImages[0]}
                alt="project image"
                objectFit="cover"
                layout="fill"
              />
            )}
          </div>
          <div className={styles.cardDetails}>
            {ipfsData && (
              <p>{ipfsData.name ? ipfsData.name : "(name not found)"}</p>
            )}
            <div className={styles.btmDetails}>
              {/* <div className={styles.review}>
              <AiFillStar size="15px" />
              4.9 (856)
            </div> */}
              {ipfsData && <div>{project.price.format()} ETH</div>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
