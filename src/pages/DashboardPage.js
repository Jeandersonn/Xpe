import React from 'react';

const DashboardPage = () => {
  // Placeholder data - will be replaced with dynamic data later
  const общийПрогресс = 60; // Example: 60%
  const основныеЦели = [
    { id: 1, text: 'Concluir Módulo de Importação', prazo: '30/06/2025', status: 'Em Andamento' },
    { id: 2, text: 'Aumentar vendas em 20%', prazo: '31/07/2025', status: 'A Fazer' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Painel de Visão Geral</h1>

      {/* Seção de Progresso Geral */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Progresso Geral do Estudo</h2>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div 
            className="bg-blue-600 h-6 rounded-full text-xs font-medium text-blue-100 text-center p-1 leading-none"
            style={{ width: `${общийПрогресс}%` }}
          >
            {общийПрогресс}%
          </div>
        </div>
      </div>

      {/* Seção de Metas Principais */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Metas Principais</h2>
        {основныеЦели.length > 0 ? (
          <ul className="space-y-3">
            {основныеЦели.map(meta => (
              <li key={meta.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{meta.text}</span>
                  <span 
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${ 
                      meta.status === 'Em Andamento' ? 'bg-yellow-200 text-yellow-800' : 
                      meta.status === 'A Fazer' ? 'bg-red-200 text-red-800' : 
                      'bg-green-200 text-green-800'
                    }`}
                  >
                    {meta.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Prazo: {meta.prazo}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhuma meta principal definida ainda.</p>
        )}
        {/* Botão para adicionar nova meta será implementado aqui */}
      </div>

      {/* Seção de Links Rápidos para Módulos (será populada dinamicamente) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Acesso Rápido aos Módulos</h2>
        <p className="text-gray-600">Links para os módulos de estudo aparecerão aqui...</p>
        {/* Links serão gerados a partir da lista de módulos */}
      </div>

    </div>
  );
};

export default DashboardPage;

