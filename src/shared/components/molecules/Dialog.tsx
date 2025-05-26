import type { ReactNode } from "react";
import { Dialog as DialogContainer, DialogTrigger } from "../ui/dialog";

interface IProps {
  label?: ReactNode;
  dialogContent?: ReactNode;
  open?: boolean;
}

export default function Dialog({
  label = "Open",
  dialogContent,
  open,
}: IProps) {
  return (
    <DialogContainer open={open}>
      <DialogTrigger>{label}</DialogTrigger>
      {dialogContent}
    </DialogContainer>
  );
}
