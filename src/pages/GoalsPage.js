import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null); // For editing
  const [newGoal, setNewGoal] = useState({ text: '', deadline: '', status: 'A Fazer', progress: 0 });

  // Load goals from localStorage
  useEffect(() => {
    const storedGoals = localStorage.getItem('userGoals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (e, id) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, progress: parseInt(e.target.value, 10) } : goal
    );
    setGoals(updatedGoals);
  };
  
  const handleStatusChange = (e, id) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, status: e.target.value } : goal
    );
    setGoals(updatedGoals);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGoal) {
      // Editing existing goal
      setGoals(goals.map(g => g.id === currentGoal.id ? { ...newGoal, id: currentGoal.id, progress: parseInt(newGoal.progress,10) } : g));
    } else {
      // Adding new goal
      setGoals([...goals, { ...newGoal, id: Date.now(), progress: parseInt(newGoal.progress,10) }]);
    }
    setNewGoal({ text: '', deadline: '', status: 'A Fazer', progress: 0 });
    setIsModalOpen(false);
    setCurrentGoal(null);
  };

  const openModal = (goal = null) => {
    if (goal) {
      setCurrentGoal(goal);
      setNewGoal({ text: goal.text, deadline: goal.deadline, status: goal.status, progress: goal.progress });
    } else {
      setCurrentGoal(null);
      setNewGoal({ text: '', deadline: '', status: 'A Fazer', progress: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGoal(null);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Metas Pessoais</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Adicionar Nova Meta</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">{currentGoal ? 'Editar Meta' : 'Adicionar Nova Meta'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Descrição da Meta</label>
                <input type="text" name="text" id="text" value={newGoal.text} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Prazo</label>
                <input type="date" name="deadline" id="deadline" value={newGoal.deadline} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" id="status" value={newGoal.status} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="A Fazer">A Fazer</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progresso (%)</label>
                <input type="number" name="progress" id="progress" value={newGoal.progress} onChange={handleInputChange} min="0" max="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">{currentGoal ? 'Salvar Alterações' : 'Adicionar Meta'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{goal.text}</h3>
                  {goal.deadline && <p className="text-sm text-gray-500">Prazo: {new Date(goal.deadline + 'T00:00:00').toLocaleDateString()}</p>}
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => openModal(goal)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => deleteGoal(goal.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor={`status-${goal.id}`} className="text-sm font-medium text-gray-600">Status:</label>
                    <select id={`status-${goal.id}`} value={goal.status} onChange={(e) => handleStatusChange(e, goal.id)} className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="A Fazer">A Fazer</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor={`progress-${goal.id}`} className="text-sm font-medium text-gray-600">Progresso: {goal.progress}%</label>
                </div>
                <input 
                    type="range" 
                    id={`progress-${goal.id}`} 
                    min="0" 
                    max="100" 
                    value={goal.progress} 
                    onChange={(e) => handleProgressChange(e, goal.id)} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma meta adicionada</h3>
          <p className="mt-1 text-sm text-gray-500">Comece adicionando suas metas de estudo ou negócio.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Adicionar Nova Meta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;

