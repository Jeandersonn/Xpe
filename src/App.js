import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalsPage';
import HabitsPage from './pages/HabitsPage';
import ModulePage from './pages/ModulePage';
import ReferencesPage from './pages/ReferencesPage';
import SettingsPage from './pages/SettingsPage'; // Para adicionar módulos
import './index.css';

const initialModules = [
  { id: 'estrategia', title: 'Estratégia e Planejamento', path: '/module/estrategia', isCustom: false },
  { id: 'importacao', title: 'Importação e Compras', path: '/module/importacao', isCustom: false },
  { id: 'multiplataformas', title: 'Multiplataformas de Venda', path: '/module/multiplataformas', isCustom: false },
  { id: 'marketing', title: 'Marketing Digital', path: '/module/marketing', isCustom: false },
  { id: 'atendimento', title: 'Atendimento ao Cliente', path: '/module/atendimento', isCustom: false },
  { id: 'gestao', title: 'Gestão Financeira e Operacional', path: '/module/gestao', isCustom: false },
  { id: 'tecnologia', title: 'Tecnologia e Ferramentas', path: '/module/tecnologia', isCustom: false },
  { id: 'tendencias', title: 'Tendências e Inovação', path: '/module/tendencias', isCustom: false },
  { id: 'casos', title: 'Relatos e Casos de Sucesso', path: '/module/casos', isCustom: false },
  { id: 'dicas', title: 'Dicas Práticas', path: '/module/dicas', isCustom: false },
];

function App() {
  const [modules, setModules] = useState(() => {
    const savedModules = localStorage.getItem('appModules');
    return savedModules ? JSON.parse(savedModules) : initialModules;
  });

  useEffect(() => {
    localStorage.setItem('appModules', JSON.stringify(modules));
  }, [modules]);

  const addModule = (newModule) => {
    setModules(prevModules => [...prevModules, { ...newModule, id: `custom-${Date.now()}`, path: `/module/custom-${Date.now()}`, isCustom: true }]);
  };

  const deleteModule = (moduleId) => {
    setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
    // Também remover dados do módulo do localStorage
    localStorage.removeItem(`module-${moduleId}`);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar modules={modules} />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage modules={modules} />} />
              {modules.map(module => (
                <Route 
                  key={module.id} 
                  path={module.path} 
                  element={<ModulePage isCustom={module.isCustom} onDeleteModule={deleteModule} />} 
                />
              ))}
              <Route path="/dashboard" element={<DashboardPage modules={modules} />} />
              <Route path="/metas" element={<GoalsPage />} />
              <Route path="/habitos" element={<HabitsPage />} />
              <Route path="/referencias" element={<ReferencesPage />} />
              <Route path="/configuracoes" element={<SettingsPage onAddModule={addModule} modules={modules} onDeleteModule={deleteModule} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

