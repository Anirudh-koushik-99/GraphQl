import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

const ProjectCard = ({ project }) => {

    const deleteProject = ((e) => {
        e.preventDefault();
        console.log('Delete')
    })

  return (
   <div className="col-md-4">
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{project.name}</h5>
          <a className="btn btn-light" href={`/projects/${project.id}`}>View</a>
        </div>
        <p className="small">
          Status: <strong>{project.status}</strong>
        </p>
      </div>
    </div>
   </div>
  );
};

export default ProjectCard;
