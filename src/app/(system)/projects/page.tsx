import CreateProject from "@/components/buttons/projects/create-project";
import { ProjectSkeleton } from "@/components/loaders/skeleton";
import ProjectList from "@/components/pages/projects/project-list";
import Search from "@/components/ui/search-bar";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div className="p-5">
      <div>
        <h3>Projects</h3>
        <div className="max-w-md my-5 flex flex-col md:flex-row md:items-center gap-5">
          <Search placeholder="Search Project" />
          <CreateProject />
        </div>
      </div>
      <Separator className="my-5" />
      <div>
        <Suspense key={query} fallback={<ProjectSkeleton />}>
          <ProjectList query={query} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
