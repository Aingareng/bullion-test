/* eslint-disable @typescript-eslint/no-explicit-any */
export default function objectToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  }

  return formData;
}
