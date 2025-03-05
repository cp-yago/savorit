import EllipsisVertical from "@/components/icons/ellipsis-vertical";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuButtonProps {
  className?: string;
}

export default function MenuButton({ className }: MenuButtonProps) {
  const handleEdit = () => {
    console.log("Edit");
  };
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full bg-white border-2 p-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-2 rounded-lg shadow-md">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
