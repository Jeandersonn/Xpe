import React from 'react';
import { Menu } from 'lucide-react'; // Example icon

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Placeholder for a menu button on mobile */}
        <button className="md:hidden mr-4">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Plano de Estudos E-commerce</h1>
      </div>
      <div>
        {/* Placeholder for user profile or other actions */}
        <p className="text-sm text-gray-600">Bem-vindo!</p>
      </div>
    </header>
  );
};

export default Header;

