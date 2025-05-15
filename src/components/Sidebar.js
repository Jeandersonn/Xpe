import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Target, CalendarDays, ListChecks, Link2 } from 'lucide-react'; // Example icons

const Sidebar = ({ modules }) => {
  const location = useLocation();

  const commonLinks = [
    { path: '/dashboard', title: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/metas', title: 'Metas Pessoais', icon: <Target size={18} /> },
    { path: '/habitos', title: 'Tracker de Hábitos', icon: <ListChecks size={18} /> },
    { path: '/referencias', title: 'Referências', icon: <Link2 size={18} /> },
    // Add calendar link if implemented
    // { path: '/calendario', title: 'Calendário', icon: <CalendarDays size={18} /> }, 
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-6 overflow-y-auto">
      <nav>
        <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Principal</h3>
        <ul className="space-y-1">
          {commonLinks.map(link => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors ${
                  location.pathname === link.path ? 'bg-gray-700 font-semibold' : ''
                }`}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Módulos de Estudo</h3>
        <ul className="space-y-1">
          {modules.map(module => (
            <li key={module.id}>
              <Link 
                to={module.path} 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors ${
                  location.pathname === module.path ? 'bg-gray-700 font-semibold' : ''
                }`}
              >
                <BookOpen size={18} /> {/* Generic icon for modules */}
                <span>{module.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

