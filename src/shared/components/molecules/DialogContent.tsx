import type { ReactNode } from "react";
import {
  DialogContent as Container,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface IProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function DialogContent({
  children,
  title,
  description,
  className,
}: IProps) {
  return (
    <Container className={className}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </Container>
  );
}
