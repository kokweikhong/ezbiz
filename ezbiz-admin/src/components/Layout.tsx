"use client";

import {
  CalendarIcon,
  FilesIcon,
  FolderIcon,
  HomeIcon,
  PieChartIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
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

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: FilesIcon, current: false },
  { name: "Reports", href: "#", icon: PieChartIcon, current: false },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      <DesktopSidebar navigation={navigation} />

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
