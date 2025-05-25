import React from "react";
import {
  Popover as PopoverContainer,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
interface IProps {
  FormControl: React.ReactNode;
  children: React.ReactNode;
}

export default function Popover({ FormControl, children }: IProps) {
  return (
    <PopoverContainer>
      <PopoverTrigger asChild>{FormControl}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {children}
      </PopoverContent>
    </PopoverContainer>
  );
}
