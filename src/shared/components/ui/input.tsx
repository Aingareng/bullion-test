import * as React from "react";
import { cn } from "@/shared/libs/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, placeholder, ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = React.useState<string>("");

    const isFileInput = type === "file";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : "");

      // Langsung teruskan event asli ke onChange handler
      props.onChange?.(e);
    };

    if (isFileInput) {
      return (
        <div
          className={cn(
            "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-xs text-base transition-[color,box-shadow] outline-none",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "disabled:cursor-not-allowed disabled:opacity-50",
            props["aria-invalid"] && "border-destructive ring-destructive/20",
            className
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="flex-1 text-sm text-muted-foreground truncate cursor-pointer">
            {fileName || placeholder || "Pilih file"}
          </span>
          {icon && <div className="ml-2 cursor-pointer">{icon}</div>}
          <input
            ref={(node) => {
              fileInputRef.current = node;

              if (typeof ref === "function") {
                ref(node);
              } else if (ref && "current" in ref && node) {
                (ref as React.RefObject<HTMLInputElement>).current = node;
              }
            }}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            onBlur={props.onBlur}
            name={props.name}
            accept={props.accept}
          />
        </div>
      );
    }

    // Default input non-file
    return (
      <div
        className={cn(
          "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-xs text-base transition-[color,box-shadow] outline-none",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props["aria-invalid"] && "border-destructive ring-destructive/20",
          className
        )}
      >
        <input
          ref={ref}
          type={type}
          data-slot="input"
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        {icon && <div className="ml-2 cursor-pointer">{icon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

// import * as React from "react";
// import { cn } from "@/shared/libs/utils";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   icon?: React.ReactNode;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, icon, ...props }, ref) => {
//     return (
//       <div
//         className={cn(
//           "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-xs text-base transition-[color,box-shadow] outline-none",
//           "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
//           "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//           "disabled:cursor-not-allowed disabled:opacity-50",
//           props["aria-invalid"] && "border-destructive ring-destructive/20",
//           className
//         )}
//       >
//         <input
//           ref={ref}
//           type={type}
//           data-slot="input"
//           className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
//           {...props}
//         />
//         {icon && <div className="ml-2 cursor-pointer">{icon}</div>}
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

// export { Input };

// import * as React from "react";

// import { cn } from "@/shared/libs/utils";

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// export { Input };
