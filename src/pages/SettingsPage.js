import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const SettingsPage = ({ onAddModule, modules, onDeleteModule }) => {
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModuleName.trim()) {
      alert('O nome do módulo não pode estar vazio.');
      return;
    }
    onAddModule({ title: newModuleName, description: newModuleDescription, topics: [], tools: [], practicalLearnings: '', notes: '' });
    setNewModuleName('');
    setNewModuleDescription('');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Configurações</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Novo Módulo Personalizado</h2>
        <form onSubmit={handleAddModule} className="space-y-4">
          <div>
            <label htmlFor="newModuleName" className="block text-sm font-medium text-gray-700">Nome do Novo Módulo</label>
            <input 
              type="text" 
              id="newModuleName" 
              value={newModuleName} 
              onChange={(e) => setNewModuleName(e.target.value)} 
              placeholder="Ex: Ferramentas Avançadas de SEO"
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="newModuleDescription" className="block text-sm font-medium text-gray-700">Descrição do Módulo (Opcional)</label>
            <textarea 
              id="newModuleDescription" 
              value={newModuleDescription} 
              onChange={(e) => setNewModuleDescription(e.target.value)} 
              rows="3"
              placeholder="Uma breve descrição sobre o que este módulo cobrirá."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Adicionar Módulo</span>
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Gerenciar Módulos Personalizados</h2>
        {modules.filter(m => m.isCustom).length > 0 ? (
          <ul className="space-y-3">
            {modules.filter(m => m.isCustom).map(module => (
              <li key={module.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="font-medium text-gray-700">{module.title}</span>
                <button 
                  onClick={() => onDeleteModule(module.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Excluir Módulo"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhum módulo personalizado adicionado ainda.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Exemplos de Uso</h2>
        <p className="text-gray-600 mb-2">Para te ajudar a começar, algumas seções já vêm com exemplos. Explore as páginas de Metas, Hábitos e os Módulos de estudo para ver como funcionam.</p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><span className="font-semibold">Metas Pessoais:</span> Adicione objetivos com prazos e acompanhe seu progresso.</li>
            <li><span className="font-semibold">Tracker de Hábitos:</span> Defina hábitos diários ou semanais e marque sua conclusão.</li>
            <li><span className="font-semibold">Módulos de Estudo:</span> Marque tópicos como concluídos, faça anotações e registre aprendizados práticos.</li>
            <li><span className="font-semibold">Referências:</span> Salve links importantes para consulta futura.</li>
        </ul>
        <p className="text-gray-600 mt-3">Sinta-se à vontade para editar ou excluir os exemplos e adicionar seu próprio conteúdo!</p>
      </div>

    </div>
  );
};

export default SettingsPage;

