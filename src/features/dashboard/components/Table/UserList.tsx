import DataTable from "@/shared/components/organisms/DataTable";
import { UserColumns } from "./UserColumns";
import Pagination from "@/shared/components/molecules/Pagination";

import { useAppDispatch } from "@/shared/hooks/reduxHook";
import UserManagement from "../UserManagement";
import useUser from "../../hooks/useUser";
import { setUserData } from "../../stores/userStore";
import { HTTP_STATUS_CODE } from "@/shared/types/apiResponse";
import { useState } from "react";

export default function UserList() {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const { users, isPending } = useUser({
    limit: String(limit),
    offset: String(offset),
  });

  const data = users?.status === HTTP_STATUS_CODE.OK ? users.data : [];
  const total = users?.data.length || 0;
  if (data.length > 0) {
    dispatch(setUserData(data));
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md grid gap-5">
      <UserManagement />
      <DataTable columns={UserColumns} data={data} />
      {data.length > 0 && (
        <Pagination
          className="flex justify-end p-2 text-primary"
          total={total}
          limit={limit}
          onPageChange={(newOffset, newLimit) => {
            setOffset(newOffset);
            setLimit(newLimit);
          }}
        />
      )}
    </div>
  );
}
