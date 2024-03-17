import EditList from "@/components/buttons/lists/edit-list";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import DeleteList from "./delete-list";

export function ListDropdown({
  project_id,
  list_id,
}: {
  project_id: number;
  list_id: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={`icon`} variant="ghost">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <EditList project_id={project_id} list_id={list_id} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteList project_id={project_id} list_id={list_id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
