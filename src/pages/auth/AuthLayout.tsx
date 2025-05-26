import { Toaster } from "@/shared/components/ui/sonner";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname.startsWith("/register");
  return (
    <div className="grid min-h-screen overflow-x-hidden  w-screen lg:grid-cols-[548px_auto] ">
      <div
        className={` overflow-hidden ${
          isRegisterPage ? "bg-register-background" : "bg-primary"
        } relative hidden bg-muted lg:block`}
      >
        <img
          src="/bullion-icon.png"
          alt="Image"
          className="opacity-25 absolute top-[-62px] left-[-214px] w-[605px]"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-start justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
