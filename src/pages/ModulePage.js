import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Placeholder data for module content - this would ideally come from a data source or be configurable
const modulesData = {
  estrategia: {
    title: 'Estratégia e Planejamento de Negócio',
    description: 'Desenvolva uma base sólida para o seu e-commerce, desde a ideia inicial até a análise de mercado e concorrência.',
    topics: [
      { id: 'epn1', text: 'Plano de Negócios para E-commerce', completed: false },
      { id: 'epn2', text: 'Definição de nicho e análise de mercado', completed: false },
      { id: 'epn3', text: 'Missão, visão, valores e diferenciais competitivos', completed: false },
      { id: 'epn4', text: 'Estruturação jurídica (MEI, ME, emissão de notas fiscais)', completed: false },
      { id: 'epn5', text: 'Metas e indicadores de desempenho', completed: false },
      { id: 'epn6', text: 'Análise de Concorrência', completed: false },
      { id: 'epn7', text: 'Ferramentas para monitorar concorrentes', completed: false },
      { id: 'epn8', text: 'Benchmarking de preços, ofertas e atendimento', completed: false },
    ],
    tools: ['SWOT Analysis Tool', 'Google Trends', 'SimilarWeb'],
    practicalLearnings: '',
    notes: '',
  },
  importacao: {
    title: 'Importação e Compras',
    description: 'Navegue pelas complexidades da importação e aprenda a negociar com fornecedores para otimizar suas compras.',
    topics: [
        { id: 'ic1', text: 'Regras e Tributos de Importação', completed: false },
        { id: 'ic2', text: 'Novas regras da Receita Federal para e-commerce', completed: false },
        { id: 'ic3', text: 'Documentação e processos para importação legalizada', completed: false },
        { id: 'ic4', text: 'Negociação com Fornecedores', completed: false },
        { id: 'ic5', text: 'Como encontrar fornecedores confiáveis (Aliexpress, Alibaba)', completed: false },
        { id: 'ic6', text: 'Estratégias para negociar melhores preços e condições', completed: false },
        { id: 'ic7', text: 'Avaliação de fornecedores nacionais', completed: false },
        { id: 'ic8', text: 'Logística de Importação', completed: false },
        { id: 'ic9', text: 'Cálculo de frete, prazos e custos totais', completed: false },
        { id: 'ic10', text: 'Gestão de estoque e reposição', completed: false },
    ],
    tools: ['Calculadora de Impostos de Importação', 'Alibaba Trade Assurance'],
    practicalLearnings: '',
    notes: '',
  },
  // ... (add other modules here based on the plan)
  multiplataformas: { title: 'Multiplataformas de Venda', description: 'Expanda seu alcance vendendo em diversos marketplaces e gerenciando seu catálogo de forma eficiente.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  marketing: { title: 'Marketing Digital para E-commerce', description: 'Atraia e converta clientes com estratégias de SEO, e-mail marketing, anúncios pagos e conteúdo relevante.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  atendimento: { title: 'Atendimento ao Cliente e Pós-venda', description: 'Fidelize clientes com um atendimento de excelência e processos eficientes de pós-venda.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  gestao: { title: 'Gestão Financeira e Operacional', description: 'Mantenha a saúde financeira do seu negócio e otimize suas operações com as ferramentas certas.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  tecnologia: { title: 'Tecnologia e Ferramentas Essenciais', description: 'Conheça as plataformas e ferramentas que podem impulsionar seu e-commerce.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  tendencias: { title: 'Tendências, Inovação e Inteligência Artificial', description: 'Mantenha-se atualizado com as últimas tendências do mercado e explore o potencial da IA no e-commerce.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  casos: { title: 'Relatos e Casos de Sucesso', description: 'Inspire-se com histórias de sucesso e aprenda com as experiências de outros empreendedores.', topics: [], tools: [], practicalLearnings: '', notes: '' },
  dicas: { title: 'Dicas Práticas e Pontos de Atenção', description: 'Receba conselhos práticos e alertas importantes para o dia a dia do seu e-commerce.', topics: [], tools: [], practicalLearnings: '', notes: '' },
};

const ModulePage = () => {
  const { moduleId } = useParams(); // Get moduleId from URL
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    // Load specific module data
    const currentModule = modulesData[moduleId];
    if (currentModule) {
      // Attempt to load saved state from localStorage
      const savedModuleData = localStorage.getItem(`module-${moduleId}`);
      if (savedModuleData) {
        setModuleData(JSON.parse(savedModuleData));
      } else {
        setModuleData(currentModule);
      }
    } else {
      // Handle module not found (e.g., redirect or show error)
      setModuleData({ title: 'Módulo não encontrado', description: '', topics: [], tools: [], practicalLearnings: '', notes: '' });
    }
  }, [moduleId]);

  useEffect(() => {
    // Save module data to localStorage whenever it changes
    if (moduleData && moduleId) {
      localStorage.setItem(`module-${moduleId}`, JSON.stringify(moduleData));
    }
  }, [moduleData, moduleId]);

  const handleTopicToggle = (topicId) => {
    setModuleData(prevData => ({
      ...prevData,
      topics: prevData.topics.map(topic =>
        topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
      ),
    }));
  };

  const handleNotesChange = (e) => {
    setModuleData(prevData => ({ ...prevData, notes: e.target.value }));
  };

  const handleLearningsChange = (e) => {
    setModuleData(prevData => ({ ...prevData, practicalLearnings: e.target.value }));
  };

  if (!moduleData) {
    return <div className="p-6">Carregando módulo...</div>;
  }

  const completedTopics = moduleData.topics.filter(t => t.completed).length;
  const totalTopics = moduleData.topics.length;
  const moduleProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">{moduleData.title}</h1>
      <p className="text-gray-600">{moduleData.description}</p>

      {/* Progress Bar for the Module */}
      {totalTopics > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Progresso do Módulo</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full text-xs font-medium text-white text-center p-0.5 leading-none"
              style={{ width: `${moduleProgress}%` }}
            >
              {moduleProgress > 10 ? `${moduleProgress}%` : ''}
            </div>
          </div>
        </div>
      )}

      {/* Topics Section */}
      {moduleData.topics.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Tópicos a Estudar</h2>
          <ul className="space-y-2">
            {moduleData.topics.map(topic => (
              <li key={topic.id} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`topic-${topic.id}`} 
                  checked={topic.completed} 
                  onChange={() => handleTopicToggle(topic.id)} 
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                />
                <label htmlFor={`topic-${topic.id}`} className={`flex-1 text-gray-700 ${topic.completed ? 'line-through text-gray-500' : ''}`}>
                  {topic.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools and Resources */}
      {moduleData.tools && moduleData.tools.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Ferramentas e Recursos Úteis</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {moduleData.tools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Practical Learnings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Aprendizados Práticos</h2>
        <textarea 
          value={moduleData.practicalLearnings} 
          onChange={handleLearningsChange} 
          rows="4" 
          placeholder="Registre aqui seus aprendizados práticos, como aplicou o conhecimento, resultados obtidos, etc."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Anotações e Dúvidas</h2>
        <textarea 
          value={moduleData.notes} 
          onChange={handleNotesChange} 
          rows="6" 
          placeholder="Suas anotações, dúvidas, insights e ideias sobre este módulo..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ModulePage;

