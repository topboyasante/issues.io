import { ListDropdown } from "@/components/buttons/lists/list-dropdown";
import IssueCard from "@/components/cards/issues/issue-card";
import CreateIssue from "@/components/buttons/issues/create-issue";
import CreateList from "@/components/buttons/lists/create-list";
import BackButton from "@/components/ui/back-button";
import { Separator } from "@/components/ui/separator";
import { getListsById } from "@/services/lists";
import { getProjectById } from "@/services/projects";

async function Page({ params }: { params: { id: number } }) {
  const [project, lists] = await Promise.all([
    getProjectById(Number(params.id)),
    getListsById(Number(params.id)),
  ]);

  return (
    <div className="">
      <div className="flex justify-between items-center gap-5 h-[7vh] p-5">
        <div className="flex items-center gap-5">
          <BackButton />
          <h3>{project?.title}</h3>
        </div>
        <CreateList project_id={Number(params.id)} />
      </div>
      <Separator />
      <div>
        {lists.length === 0 ? (
          <div className="my-8">
            <h3 className="text-center">No Lists Exist.</h3>
          </div>
        ) : (
          <div className="flex flex-nowrap overflow-x-auto gap-5 h-[93vh] p-5">
            {lists.map((item) => (
              <div
                key={item.id}
                className="flex-none border rounded-md p-5 w-[400px] h-full"
              >
                <div className="flex justify-between items-center h-[10%]">
                  <h5>{item.title}</h5>
                  <ListDropdown project_id={params.id} list_id={item.id} />
                </div>
                <Separator className="my-3" />
                <div className="h-[90%]">
                  <div className="h-[90%] overflow-auto">
                    {item.issues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue_id={issue.id}
                        project_id={params.id}
                        title={issue.title}
                        description={issue.description}
                      />
                    ))}
                  </div>
                  <div className="h-[5%]">
                    <CreateIssue project_id={params.id} list_id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
