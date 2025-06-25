import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

export default function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Visualisation de votre activité</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span>PharmaML</span>
              <span>/</span>
              <span className="text-teal-600">Tableau de Bord</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>Bienvenue sur votre frontal de commandes</span>
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}