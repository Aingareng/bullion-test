import { Navigate, Outlet } from "react-router-dom";
import localStorageUtils from "@/shared/utils/storage";
import type { ILoginData } from "@/features/auth/types/auth";

export default function Authenticated() {
  const user = localStorageUtils.get<ILoginData>("USER");
  const isAuthenticated = user?.token ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
