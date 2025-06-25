import React from 'react';
import { 
  BarChart3, 
  Building2, 
  Package, 
  List, 
  ShoppingCart, 
  Users, 
  Download, 
  FileText, 
  Settings, 
  UserCheck, 
  Folder,
  Menu,
  User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { icon: BarChart3, label: 'Tableau de Bord', active: true, badge: null },
    { icon: Building2, label: 'Officines', active: false, badge: '354' },
    { icon: Package, label: 'Articles', active: false, badge: '52 231' },
    { icon: List, label: 'Listes CEPS', active: false, badge: null },
    { icon: ShoppingCart, label: 'Commandes', active: false, badge: '1' },
    { icon: Users, label: 'Flux par Clients', active: false, badge: null },
    { icon: Download, label: 'Téléchargements', active: false, badge: null },
    { icon: FileText, label: 'Documents', active: false, badge: null },
    { icon: List, label: 'Listes', active: false, badge: null },
    { icon: Settings, label: 'Liste modifications', active: false, badge: null },
    { icon: User, label: 'Utilisateurs', active: false, badge: null },
    { icon: UserCheck, label: 'Rôles utilisateurs', active: false, badge: null },
    { icon: Folder, label: 'Catalogues', active: false, badge: null },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-teal-500 text-white z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64`}>
        {/* Logo and User Info */}
        <div className="p-4 border-b border-teal-400">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="text-teal-500 font-bold text-lg">i</div>
            </div>
            <div>
              <div className="font-bold text-lg">INFOSOFT</div>
            </div>
          </div>
          
          <div className="bg-teal-600 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">POISOT Paul</span>
            </div>
            <div className="text-xs text-teal-200">Administrateur</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.active 
                      ? 'bg-teal-600 text-white' 
                      : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-teal-400 text-teal-900 text-xs px-2 py-1 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}