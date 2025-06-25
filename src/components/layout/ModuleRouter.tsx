import React from "react";
import UserManagement from "../modules/UserManagement";
import OfficeManagement from "../modules/OfficeManagement";
import ProductCatalog from "../modules/ProductCatalog";
import OrderManagement from "../modules/OrderManagement";
import NotificationCenter from "../modules/NotificationCenter";
import CepsManagement from "../modules/CepsManagement";
import DocumentManagement from "../modules/DocumentManagement";
import ListsManagement from "../modules/ListsManagement";
import ServerSettings from "../modules/ServerSettings";
import RoleManagement from "../modules/RoleManagement";
import ProfileSettings from "../modules/ProfileSettings";
import FluxParClients from "../modules/FluxParClients";
import DownloadHistory from "../modules/DownloadHistory";
import ModificationHistory from "../modules/ModificationHistory";

interface ModuleRouterProps {
  activeModule: string;
}

export default function ModuleRouter({ activeModule }: ModuleRouterProps) {
  switch (activeModule) {
    case 'users':
      return <UserManagement />;
    case 'user-roles':
      return <RoleManagement />;
    case 'officines':
      return <OfficeManagement />;
    case 'products':
      return <ProductCatalog />;
    case 'orders':
      return <OrderManagement />;
    case 'notifications':
      return <NotificationCenter />;
    case 'ceps':
      return <CepsManagement />;
    case 'documents':
      return <DocumentManagement />;
    case 'lists':
      return <ListsManagement />;
    case 'settings':
      return <ServerSettings />;
    case 'profile':
    case 'preferences':
    case 'security':
      return <ProfileSettings />;
    case 'client-flows':
      return <FluxParClients />;
    case 'downloads':
      return <DownloadHistory />;
    case 'modifications':
      return <ModificationHistory />;
    case 'catalogs':
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Catalogues
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Module en cours de développement - Gestion des catalogues produits
          </p>
        </div>
      );
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Module non trouvé
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Le module demandé n'existe pas ou n'est pas encore implémenté.
          </p>
        </div>
      );
  }
}