import * as React from "react";
import { Button } from "./Button";
import { cn } from "../lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "bg-white text-[32px] text-[rgb(238, 0, 0)] font-light w-full py-6 px-[70px] rounded-[31px] h-auto hover:bg-gray-50 transition-colors",
        "max-md:max-w-full max-md:px-5",
        className,
      )}
      variant="ghost"
      {...props}
    >
      {title}
    </Button>
  );
};