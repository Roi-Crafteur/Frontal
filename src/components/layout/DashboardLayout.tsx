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

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const { activeModule, setActiveModule } = useStore();

  const links = [
    {
      label: "Tableau de Bord",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('dashboard')
    },
    {
      label: "Utilisateurs",
      href: "#",
      icon: <IconUser className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('users')
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
      label: "Commandes",
      href: "#",
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('orders')
    },
    {
      label: "Notifications",
      href: "#",
      icon: <IconBell className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('notifications')
    },
    {
      label: "Listes CEPS",
      href: "#",
      icon: <IconList className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('ceps')
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <Logo />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link}
                    onClick={link.onClick}
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "POISOT Paul",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 shrink-0 rounded-full bg-teal-400 flex items-center justify-center">
                      <IconUser className="h-4 w-4 text-teal-900" />
                    </div>
                  ),
                }}
              />
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
      <div className="h-8 w-8 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-lg">
        <div className="text-teal-500 font-bold text-lg">i</div>
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
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-6 dark:border-neutral-700 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};