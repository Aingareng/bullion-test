import AppSidebar from "@/shared/components/organisms/AppSidebar";
import DashboardHeader from "@/shared/components/organisms/DashboardHeader";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Toaster } from "@/shared/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />
        <main className="flex-1 w-full bg-dashboard-background">
          <DashboardHeader />
          <Outlet />
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
