import CardSM from "@/components/cards/dashboard/dashboard-card-sm";
import { Separator } from "@/components/ui/separator";
import { getAllIssues } from "@/services/issues";
import { getAllLists } from "@/services/lists";
import { getAllProjects } from "@/services/projects";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession();
  const [projects, lists, issues] = await Promise.all([
    getAllProjects(session?.user.email as string),
    getAllLists(session?.user.email as string),
    getAllIssues(session?.user.email as string),
  ]);
  return (
    <div className="p-5">
      <div>
        <h3>Dashboard</h3>
      </div>
      <Separator className="my-5" />
      <div className="grid md:grid-cols-3 gap-5">
        <CardSM title="Total Projects" value={projects.length} />
        <CardSM title="Total Lists" value={lists.length} />
        <CardSM title="Total Issues" value={issues.length} />
      </div>
    </div>
  );
}

export default page;
