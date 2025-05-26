import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Menu, Square } from "lucide-react";
import BuillionLogo from "@/assets/bullion-ecosystem.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import localStorageUtils from "@/shared/utils/storage";
import type { ILoginData } from "@/features/auth/types/auth";

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
  const user = localStorageUtils.get<ILoginData>("USER");
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarHeader>
        <header className="flex justify-between items-center p-3">
          <img
            src={BuillionLogo}
            alt="bullion-logo"
            className="w-[104px] h-[32px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/login")}>
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
