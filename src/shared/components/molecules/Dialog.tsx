import type { ReactNode } from "react";
import { Dialog as DialogContainer, DialogTrigger } from "../ui/dialog";

interface IProps {
  label?: ReactNode;
  dialogContent?: ReactNode;
}

export default function Dialog({ label = "Open", dialogContent }: IProps) {
  return (
    <DialogContainer>
      <DialogTrigger>{label}</DialogTrigger>
      {dialogContent}
    </DialogContainer>
  );
}
