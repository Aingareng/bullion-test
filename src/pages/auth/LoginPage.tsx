import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto grid gap-4 w-[405px]">
      <h1 className="font-bold">Login Admin</h1>
      <LoginForm />
    </div>
  );
}
