import LoginForm from "@/features/auth/components/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="mx-auto grid gap-4 w-[405px]">
      <h1 className="font-bold">Login Admin</h1>
      <LoginForm />
    </div>
  );
}
