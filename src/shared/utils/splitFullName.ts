export default function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const names = fullName.trim().split(/\s+/);

  const firstName = names[0] || "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";

  return { firstName, lastName };
}
