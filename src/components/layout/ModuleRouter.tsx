import React from "react";
import UserManagement from "../modules/UserManagement";
import OfficeManagement from "../modules/OfficeManagement";
import ProductCatalog from "../modules/ProductCatalog";
import OrderManagement from "../modules/OrderManagement";
import NotificationCenter from "../modules/NotificationCenter";

interface ModuleRouterProps {
  activeModule: string;
}

export default function ModuleRouter({ activeModule }: ModuleRouterProps) {
  switch (activeModule) {
    case 'users':
      return <UserManagement />;
    case 'officines':
      return <OfficeManagement />;
    case 'products':
      return <ProductCatalog />;
    case 'orders':
      return <OrderManagement />;
    case 'notifications':
      return <NotificationCenter />;
    default:
      return null;
  }
}