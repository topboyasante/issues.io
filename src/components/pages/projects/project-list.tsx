import ProjectCard from "@/components/cards/projects/project-card";
import React from "react";
import { getAllProjects } from "@/services/projects";
import { getServerSession } from "next-auth";

type SearchParams = {
  query?: string;
};

async function ProjectList({ ...props }: SearchParams) {
  const session = await getServerSession();
  const query = props?.query || "";
  const projects = await getAllProjects(session?.user.email as string, query);

  return (
    <div>
      {projects.length === 0 ? (
        <div className="my-8">
          <h3 className="text-center">No Projects Exist.</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((item) => {
            return (
              <ProjectCard key={item.id} id={item.id} title={item.title} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
