import LatestProjects from "../../src/components/latestprojects";

export default function Projects(){
    return (
        <div style={{display: "flex", alignContent: "center", flexDirection: "column"}}> 
            <h1 style={{textAlign: "center", marginTop: "20px"}}>Latest Projects</h1>
            <LatestProjects/>
        </div>
    )
}