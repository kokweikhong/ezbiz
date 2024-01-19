"use client";

import {
  FolderIcon,
  HomeIcon,
  LinkedinIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export type NavigationItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  current: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const [navigation, setNavigation] = React.useState<NavigationItem[]>([
    { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
    { name: "Users", href: "/users", icon: UsersIcon, current: false },
    { name: "Pages", href: "/pages", icon: FolderIcon, current: false },
    { name: "Socials", href: "/socials", icon: LinkedinIcon, current: false },
    // { name: "Documents", href: "#", icon: FilesIcon, current: false },
    // { name: "Reports", href: "#", icon: PieChartIcon, current: false },
  ]);

  React.useEffect(() => {
    setNavigation(
      navigation.map((item) => ({
        ...item,
        current: item.href === pathname,
      }))
    );
  }, [pathname]);

  return (
    <div>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      <DesktopSidebar pathname={pathname} navigation={navigation} />

      <div className="lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
