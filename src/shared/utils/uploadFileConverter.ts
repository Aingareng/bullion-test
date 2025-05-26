export function base64ToFile(
  base64: string,
  fileName: string,
  mimeType = "image/jpeg"
): File {
  const byteString = atob(base64);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], fileName, { type: mimeType });
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      } else {
        reject("Gagal mengubah file ke base64");
      }
    };

    reader.onerror = (error) => reject(error);
  });
}
