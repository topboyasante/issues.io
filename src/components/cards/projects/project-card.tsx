import DeleteProject from "@/components/buttons/projects/delete-project";
import Link from "next/link";
import React from "react";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditProject from "@/components/buttons/projects/edit-project";

type CardProps = {
  id: number;
  title: string;
};

function ProjectCard({ id, title }: CardProps) {
  return (
    <div className="border p-5 rounded-md">
      <p>{title}</p>
      <br />
      <div className="flex justify-end items-center gap-3">
        <Link href={`projects/${id}`}>
          <Button size={`icon`}>
            <EyeOpenIcon />
          </Button>
        </Link>
        <EditProject id={id}/>
        <DeleteProject id={id} />
      </div>
    </div>
  );
}

export default ProjectCard;
