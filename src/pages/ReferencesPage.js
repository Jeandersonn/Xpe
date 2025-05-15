import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Link as LinkIcon } from 'lucide-react';

const ReferencesPage = () => {
  const [references, setReferences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReference, setCurrentReference] = useState(null); // For editing
  const [newReference, setNewReference] = useState({ title: '', url: '', description: '' });

  // Load references from localStorage
  useEffect(() => {
    const storedReferences = localStorage.getItem('userReferences');
    if (storedReferences) {
      setReferences(JSON.parse(storedReferences));
    }
  }, []);

  // Save references to localStorage
  useEffect(() => {
    localStorage.setItem('userReferences', JSON.stringify(references));
  }, [references]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReference(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReference.title.trim() || !newReference.url.trim()) return;

    if (currentReference) {
      // Editing existing reference
      setReferences(references.map(ref => ref.id === currentReference.id ? { ...newReference, id: currentReference.id } : ref));
    } else {
      // Adding new reference
      setReferences([...references, { ...newReference, id: Date.now() }]);
    }
    setNewReference({ title: '', url: '', description: '' });
    setIsModalOpen(false);
    setCurrentReference(null);
  };

  const openModal = (reference = null) => {
    if (reference) {
      setCurrentReference(reference);
      setNewReference({ title: reference.title, url: reference.url, description: reference.description });
    } else {
      setCurrentReference(null);
      setNewReference({ title: '', url: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReference(null);
  };

  const deleteReference = (id) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Referências e Links Úteis</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Adicionar Nova Referência</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">{currentReference ? 'Editar Referência' : 'Adicionar Nova Referência'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="title" id="title" value={newReference.title} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                <input type="url" name="url" id="url" value={newReference.url} onChange={handleInputChange} required placeholder="https://exemplo.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
                <textarea name="description" id="description" value={newReference.description} onChange={handleInputChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">{currentReference ? 'Salvar Alterações' : 'Adicionar Referência'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {references.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map(ref => (
            <div key={ref.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{ref.title}</h3>
                {isValidUrl(ref.url) ? 
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline break-all flex items-center text-sm">
                    <LinkIcon size={14} className="mr-1 flex-shrink-0" /> {ref.url}
                  </a> 
                  : <p className='text-sm text-gray-500 break-all'>{ref.url}</p>
                }
                {ref.description && <p className="text-sm text-gray-600 mt-2">{ref.description}</p>}
              </div>
              <div className="flex space-x-2 mt-4 self-end">
                <button onClick={() => openModal(ref)} className="text-blue-600 hover:text-blue-800 p-1"><Edit size={18} /></button>
                <button onClick={() => deleteReference(ref.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma referência adicionada</h3>
          <p className="mt-1 text-sm text-gray-500">Adicione links úteis, artigos, vídeos ou qualquer material de apoio.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Adicionar Nova Referência
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesPage;

