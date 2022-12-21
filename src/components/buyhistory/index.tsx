import ProjectCard from "../projectcard";
import styles from "./buyhistory.module.scss";
import { ProjectOutput, VectorOutput, WebgumContractAbi } from "../../contracts/WebgumContractAbi"
import { useState, useEffect } from 'react'

interface IBuyHistory{
  buyerVector: VectorOutput | undefined
  contract: WebgumContractAbi | null
}

const BuyHistory = ({ buyerVector, contract }: IBuyHistory) => {
  const [totalProjects, setTotalProjects] = useState(0)
  const [boughtProjects, setBoughtProjects] = useState<ProjectOutput[]>()

  useEffect(() => {
    async function getProjects(){
      if(buyerVector && contract){
        let num_of_projects = parseFloat(buyerVector.current_ix.format()) * 1_000_000_000
        setTotalProjects(num_of_projects)
        let projects = [];
        for (let i = 0; i < num_of_projects; i++) {
          // loop through each project created and get the project
          let resp = await contract.functions.get_project(buyerVector.inner[i]).get();
          projects.push(resp.value)
        }
        setBoughtProjects(projects)
      }
    }
    getProjects();
  }, [buyerVector, contract])

  return (
    <div className={styles.container}>
      <p>You have bought {totalProjects} {totalProjects == 1 ? "project" : "projects"}</p>
    {boughtProjects?.map((project) => <div key={project.project_id.format()}>
      <ProjectCard project={project}/> 
    </div>)}
    {!boughtProjects && <div>No bought projects yet</div>}
  </div>
  )
}

export default BuyHistory