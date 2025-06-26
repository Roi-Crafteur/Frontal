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
import ProfileMenu from "./ProfileMenu";
import SiteHeader from "./SiteHeader";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const { activeModule, setActiveModule } = useStore();

  // Ordre original exact du menu selon votre documentation (sans Paramètres Serveur)
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
          <SidebarBody className="justify-between">
            <div className="flex flex-1 flex-col">
              <Logo />
              
              {/* Navigation principale - sans scroll, ordre original */}
              <div className="mt-6 flex flex-col space-y-1">
                {links.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link}
                    onClick={link.onClick}
                  />
                ))}
              </div>
            </div>
            
            {/* Profil utilisateur en bas avec menu déroulant */}
            <div className="border-t border-teal-400/30 pt-4">
              <ProfileMenu />
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

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-8 w-8 shrink-0 rounded-xl bg-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
        <div className="text-white font-bold text-lg">i</div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl whitespace-pre text-white"
      >
        INFOSOFT
      </motion.span>
    </a>
  );
};

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