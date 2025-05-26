// useFileInput.ts
import { useState } from "react";

export function useFileInput() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  function handleChange(file: File) {
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function reset() {
    setPreviewUrl(null);
    setFileName("");
  }

  return {
    previewUrl,
    fileName,
    handleChange,
    reset,
    setFileName,
  };
}

// import { useState } from "react";

// export function useFileInput(initialFileName?: string) {
//   const [fileName, setFileName] = useState<string>(initialFileName || "");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   function handleFileChange(
//     e: React.ChangeEvent<HTMLInputElement>,
//     onChange: (file: File) => void
//   ) {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//       setPreviewUrl(URL.createObjectURL(file));
//       onChange(file);
//     }
//   }

//   function resetFile() {
//     setFileName("");
//     setPreviewUrl(null);
//   }

//   return {
//     fileName,
//     previewUrl,
//     handleFileChange,
//     resetFile,
//     setFileName,
//   };
// }
