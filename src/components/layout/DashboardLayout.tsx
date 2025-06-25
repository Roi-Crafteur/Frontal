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

  // Groupement logique des liens de navigation
  const mainLinks = [
    {
      label: "Tableau de Bord",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('dashboard')
    },
    {
      label: "Commandes",
      href: "#",
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('orders')
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
  ];

  const managementLinks = [
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
      label: "Documents",
      href: "#",
      icon: <IconFileText className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('documents')
    },
    {
      label: "Téléchargements",
      href: "#",
      icon: <IconDownload className="h-5 w-5 shrink-0 text-teal-100" />,
      onClick: () => setActiveModule('downloads')
    },
  ];

  const adminLinks = [
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
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="flex h-full w-full">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between">
            <div className="flex flex-1 flex-col">
              <Logo />
              
              {/* Navigation principale - sans scroll */}
              <div className="mt-6 flex flex-col space-y-1">
                {/* Section principale */}
                <div className="space-y-1">
                  {mainLinks.map((link, idx) => (
                    <SidebarLink 
                      key={idx} 
                      link={link}
                      onClick={link.onClick}
                    />
                  ))}
                </div>

                {/* Séparateur visuel */}
                <div className="my-3 border-t border-teal-400/30"></div>

                {/* Section gestion */}
                <div className="space-y-1">
                  {managementLinks.map((link, idx) => (
                    <SidebarLink 
                      key={idx} 
                      link={link}
                      onClick={link.onClick}
                    />
                  ))}
                </div>

                {/* Séparateur visuel */}
                <div className="my-3 border-t border-teal-400/30"></div>

                {/* Section administration */}
                <div className="space-y-1">
                  {adminLinks.map((link, idx) => (
                    <SidebarLink 
                      key={idx} 
                      link={link}
                      onClick={link.onClick}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Profil utilisateur en bas */}
            <div className="border-t border-teal-400/30 pt-4">
              <SidebarLink
                link={{
                  label: "POISOT Paul",
                  href: "#",
                  icon: (
                    <div className="h-6 w-6 shrink-0 rounded-full bg-teal-400 flex items-center justify-center">
                      <IconUser className="h-3 w-3 text-teal-900" />
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
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};