import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function DashboardHeader() {
  const { open } = useSidebar();

  return <header>{!open && <SidebarTrigger />}</header>;
}
