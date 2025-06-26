"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/aceternity/sidebar";
import {
  IconBrandTabler,
  IconBuilding,
  IconPackage,
  IconList,
  IconShoppingCart,
  IconUsers,
  IconDownload,
  IconFileText,
  IconSettings,
  IconUserCheck,
  IconFolder,
  IconUser,
  IconBell,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useStore } from "../../store/useStore";
import ModuleRouter from "./ModuleRouter";
import SiteHeader from "./SiteHeader";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const { activeModule, setActiveModule } = useStore();

  // Navigation simplifiée pour la sidebar (sans les éléments utilisateur)
  const links = [
    {
      label: "Tableau de Bord",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('dashboard')
    },
    {
      label: "Officines",
      href: "#",
      icon: <IconBuilding className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('officines')
    },
    {
      label: "Articles",
      href: "#",
      icon: <IconPackage className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('products')
    },
    {
      label: "Listes CEPS",
      href: "#",
      icon: <IconList className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('ceps')
    },
    {
      label: "Commandes",
      href: "#",
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('orders')
    },
    {
      label: "Flux par Clients",
      href: "#",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('client-flows')
    },
    {
      label: "Téléchargements",
      href: "#",
      icon: <IconDownload className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('downloads')
    },
    {
      label: "Documents",
      href: "#",
      icon: <IconFileText className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('documents')
    },
    {
      label: "Listes",
      href: "#",
      icon: <IconList className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('lists')
    },
    {
      label: "Liste modifications",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('modifications')
    },
    {
      label: "Utilisateurs",
      href: "#",
      icon: <IconUser className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('users')
    },
    {
      label: "Rôles utilisateurs",
      href: "#",
      icon: <IconUserCheck className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('user-roles')
    },
    {
      label: "Catalogues",
      href: "#",
      icon: <IconFolder className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('catalogs')
    },
    {
      label: "Notifications",
      href: "#",
      icon: <IconBell className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('notifications')
    },
  ];

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden flex flex-col">
      {/* Site Header - seamlessly integrated */}
      <SiteHeader />
      
      {/* Main Content - no gap between header and sidebar */}
      <div className="flex h-full w-full flex-1 min-h-0">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-start">
            <div className="flex flex-1 flex-col">
              {/* Navigation principale - sans scroll, ordre original */}
              <div className="flex flex-col space-y-1 mt-4">
                {links.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link}
                    onClick={link.onClick}
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <Dashboard>
          {activeModule === 'dashboard' ? children : <ModuleRouter activeModule={activeModule} />}
        </Dashboard>
      </div>
    </div>
  );
}

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0">
      <div className="flex-1 bg-white dark:bg-neutral-900 overflow-y-auto min-h-0">
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};