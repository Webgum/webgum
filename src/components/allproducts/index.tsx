import ProjectCard from "../projectcard";
import styles from "./allproducts.module.scss";
import { useState, useEffect } from 'react'
import { ProjectOutput, VectorOutput, WebgumContractAbi } from "../../contracts/WebgumContractAbi"

interface IAllProducts{
  creatorVector: VectorOutput | undefined,
  contract: WebgumContractAbi | null
}


const AllProducts = ({ creatorVector, contract }: IAllProducts) => {
  const [totalProjects, setTotalProjects] = useState(0)
  const [allProjects, setAllProjects] = useState<ProjectOutput[]>()

  useEffect(() => {
    async function getProjects(){
      if(creatorVector && contract){
        let num_of_projects = parseFloat(creatorVector.current_ix.format()) * 1_000_000_000
        setTotalProjects(num_of_projects)
        let projects = [];
        for (let i = 0; i < num_of_projects; i++) {
          // loop through each project created and get the project
          let resp = await contract.functions.get_project(creatorVector.inner[i]).get();
          projects.push(resp.value)
        }
        setAllProjects(projects)
      }
    }
    getProjects();
  }, [creatorVector, contract])
  

  return (
    <div className={styles.container}>
      <p>You have listed {totalProjects} {totalProjects == 1 ? "project" : "projects"}</p>
      {allProjects?.map((project) => <div key={project.project_id.format()}>
        <ProjectCard project={project}/> 
      </div>)}
    </div>
  );
};

export default AllProducts;
