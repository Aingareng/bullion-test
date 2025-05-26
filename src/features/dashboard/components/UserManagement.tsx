import ViewUser from "@/features/dashboard/components/ViewUser";
import EditUser from "@/features/dashboard/components/EditUser";
// import { useAppSelector, useAppDispatch } from "@/shared/hooks/reduxHook";
import {
  closeDialog,
  openDialog,
} from "@/features/dashboard/stores/dialogStore";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHook";
import { Dialog } from "@/shared/components/ui/dialog";

export default function UserManagement() {
  const isOpen = useAppSelector((s) => s.dialog.isOpen);
  const mode = useAppSelector((s) => s.dialog.mode);
  const dispatch = useAppDispatch();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
        {mode === "view" && (
          <ViewUser onEditClick={() => dispatch(openDialog("edit"))} />
        )}
        {mode === "edit" && <EditUser />}
      </Dialog>
    </>
  );
}
