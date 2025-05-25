import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import { Square } from "lucide-react";
import BuillionLogo from "@/assets/bullion-ecosystem.png";

const items = [
  {
    title: "User Aktif",
    url: "#",
    icon: Square,
  },
  {
    title: "Menu 2",
    url: "#",
    icon: Square,
  },
  {
    title: "Menu 3",
    url: "#",
    icon: Square,
  },
  {
    title: "Menu 4",
    url: "#",
    icon: Square,
  },
  {
    title: "Menu 5",
    url: "#",
    icon: Square,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <header className="flex justify-between items-center p-3">
          <img
            src={BuillionLogo}
            alt="bullion-logo"
            className="w-[104px] h-[32px]"
          />
          <SidebarTrigger />
        </header>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5 mr-2 fill-[#7e1810] stroke-[#7e1810]" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
