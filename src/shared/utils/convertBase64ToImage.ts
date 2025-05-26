export function convertBase64ToImage(
  base64: string,
  type: "png" | "jpeg" | "webp" = "png"
): string {
  return `data:image/${type};base64,${base64}`;
}
