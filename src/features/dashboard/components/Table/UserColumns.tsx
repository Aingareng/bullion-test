import { type ColumnDef } from "@tanstack/react-table";
import type { IUserData } from "../../types/dashboard";
import { Button } from "@/shared/components/ui/button";
import { formatDateToDDMMYYYY } from "@/shared/utils/formatDate";
import Dialog from "@/shared/components/molecules/Dialog";
import ViewUser from "../ViewUser";
import { Eye, SquarePen } from "lucide-react";
import EditUser from "../EditUser";

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
    cell: ({ row }) => (row.original.status = "Registered"),
  },
  {
    header: "Action",
    cell: () => (
      <div className="flex flex-wrap gap-6">
        <Dialog
          label={
            <Button
              asChild
              type="button"
              variant="ghost"
              size="icon"
              className="cursor-pointer text-primary bg-none hover:bg-none"
            >
              <div>
                <Eye />
                <span className="font-normal">Lihat</span>
              </div>
            </Button>
          }
          dialogContent={<ViewUser />}
        />

        <Dialog
          label={
            <Button
              asChild
              type="button"
              variant="ghost"
              size="icon"
              className="cursor-pointer text-primary bg-none hover:bg-none"
            >
              <div>
                <SquarePen />
                <span className="font-normal">Edit</span>
              </div>
            </Button>
          }
          dialogContent={<EditUser />}
        />
      </div>
    ),
  },
];
