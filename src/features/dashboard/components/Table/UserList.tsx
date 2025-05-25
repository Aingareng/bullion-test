import DataTable from "@/shared/components/organisms/DataTable";
import { UserColumns } from "./UserColumns";
import { dummyDataUser } from "../../types/dashboard";
import Pagination from "@/shared/components/molecules/Pagination";

export default function UserList() {
  return (
    <div className="bg-white rounded-md grid gap-5">
      <DataTable columns={UserColumns} data={dummyDataUser} />

      <Pagination className="flex justify-end p-2 text-primary" />
    </div>
  );
}
