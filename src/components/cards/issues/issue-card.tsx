import DeleteIssue from "@/components/buttons/issues/delete-issue";
import EditIssue from "@/components/buttons/issues/edit-issue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CardProps = {
  issue_id: string;
  project_id: string;
  title: string;
  description: string;
};

function IssueCard({ ...props }: CardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={props.issue_id}
          className="bg-[#f5f5f5] dark:bg-[#121212] px-5 py-3 rounded-md cursor-pointer my-5"
        >
          <p>{props.title}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <br />
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <EditIssue issue_id={props.issue_id} project_id={props.project_id} />
          <DeleteIssue
            project_id={props.project_id}
            issue_id={props.issue_id}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default IssueCard;
