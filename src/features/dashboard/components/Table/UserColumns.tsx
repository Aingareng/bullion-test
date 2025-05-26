import { type ColumnDef } from "@tanstack/react-table";
import type { IUserData } from "../../types/dashboard";
import { Button } from "@/shared/components/ui/button";
import { formatDateToDDMMYYYY } from "@/shared/utils/formatDate";
import { Eye, SquarePen } from "lucide-react";

import { store } from "@/shared/store/store";
import { findUserData } from "../../stores/userStore";
import { openDialog } from "../../stores/dialogStore";

export const UserColumns: ColumnDef<IUserData>[] = [
  {
    accessorKey: "_id",
    header: "Account ID",
    cell: ({ row }) => `#${row.original._id}`,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "date_of_birth",
    header: "Date",
    cell: ({ row }) => formatDateToDDMMYYYY(row.original.date_of_birth),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const userId = row.original._id;
      const handleEditClick = () => {
        store.dispatch(findUserData({ id: userId }));
        store.dispatch(openDialog("edit"));
      };
      const handleViewClick = () => {
        store.dispatch(findUserData({ id: userId }));
        store.dispatch(openDialog("view"));
      };
      return (
        <div className="flex flex-wrap gap-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="cursor-pointer text-primary bg-none hover:bg-none"
            onClick={handleViewClick}
          >
            <Eye />
            <span className="font-normal">Lihat</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="cursor-pointer text-primary bg-none hover:bg-none"
            onClick={handleEditClick}
          >
            <SquarePen />
            <span className="font-normal">Edit</span>
          </Button>
        </div>
      );
    },
  },
];
