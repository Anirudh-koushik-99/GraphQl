import { gql, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from './ProjectCard'
import Loader from "./Loader";


const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if(loading) return <Loader />
  if(error) return <p>Something went wrong</p>
  return <>
  {data.projects.length > 0 ? (!loading && !error && (
    <div className="row mt-4">
            {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project}/>
            ))}
    </div>
  )) : (<p>No Projects</p>)}</>;
};

export default Projects;
