import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, CheckSquare, Square } from 'lucide-react';

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null); // For editing
  const [newHabitText, setNewHabitText] = useState('');
  const [habitLog, setHabitLog] = useState({}); // { [habitId]: { [dateString]: boolean } }

  // Load habits and log from localStorage
  useEffect(() => {
    const storedHabits = localStorage.getItem('userHabits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    const storedHabitLog = localStorage.getItem('userHabitLog');
    if (storedHabitLog) {
      setHabitLog(JSON.parse(storedHabitLog));
    }
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem('userHabits', JSON.stringify(habits));
  }, [habits]);

  // Save habit log to localStorage
  useEffect(() => {
    localStorage.setItem('userHabitLog', JSON.stringify(habitLog));
  }, [habitLog]);

  const handleInputChange = (e) => {
    setNewHabitText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabitText.trim()) return;

    if (currentHabit) {
      // Editing existing habit
      setHabits(habits.map(h => h.id === currentHabit.id ? { ...h, text: newHabitText } : h));
    } else {
      // Adding new habit
      setHabits([...habits, { id: Date.now(), text: newHabitText }]);
    }
    setNewHabitText('');
    setIsModalOpen(false);
    setCurrentHabit(null);
  };

  const openModal = (habit = null) => {
    if (habit) {
      setCurrentHabit(habit);
      setNewHabitText(habit.text);
    } else {
      setCurrentHabit(null);
      setNewHabitText('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHabit(null);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
    // Optionally, remove logs for this habit
    const newLog = { ...habitLog };
    delete newLog[id];
    setHabitLog(newLog);
  };

  const toggleHabitLog = (habitId, dateString) => {
    setHabitLog(prevLog => {
      const habitEntry = prevLog[habitId] || {};
      return {
        ...prevLog,
        [habitId]: {
          ...habitEntry,
          [dateString]: !habitEntry[dateString]
        }
      };
    });
  };

  // Get dates for the last 7 days
  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
    }
    return dates.reverse(); // Oldest to newest
  };

  const weekDates = getLast7Days();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Tracker de Hábitos</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Adicionar Novo Hábito</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">{currentHabit ? 'Editar Hábito' : 'Adicionar Novo Hábito'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="habitText" className="block text-sm font-medium text-gray-700">Descrição do Hábito</label>
                <input type="text" name="habitText" id="habitText" value={newHabitText} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">{currentHabit ? 'Salvar Alterações' : 'Adicionar Hábito'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {habits.length > 0 ? (
        <div className="bg-white shadow overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hábito</th>
                {weekDates.map(date => (
                  <th key={date} scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habits.map(habit => (
                <tr key={habit.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{habit.text}</td>
                  {weekDates.map(dateString => (
                    <td key={dateString} className="px-4 py-4 whitespace-nowrap text-center">
                      <button onClick={() => toggleHabitLog(habit.id, dateString)} className="text-gray-600 hover:text-blue-600">
                        {(habitLog[habit.id] && habitLog[habit.id][dateString]) ? <CheckSquare size={20} className="text-green-500" /> : <Square size={20} />}
                      </button>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => openModal(habit)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    <button onClick={() => deleteHabit(habit.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum hábito adicionado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece adicionando hábitos que você deseja acompanhar.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Adicionar Novo Hábito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsPage;

