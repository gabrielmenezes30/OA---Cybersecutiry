import React, { useState } from 'react';
import { Mission, QuestionType, LearningModule, Question, ContentBlock, Reference } from '../types';
import { Plus, Trash2, Save, BookOpen, X, Edit, Code, Type, AlertCircle, ExternalLink } from 'lucide-react';

interface AdminMissionEditorProps {
  initialMission?: Mission | null;
  onSave: (mission: Mission) => void;
  onCancel: () => void;
}

export const AdminMissionEditor: React.FC<AdminMissionEditorProps> = ({ initialMission, onSave, onCancel }) => {
  // Form State initialized with props or defaults
  const [title, setTitle] = useState(initialMission?.title || '');
  const [description, setDescription] = useState(initialMission?.description || '');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(initialMission?.difficulty || 'Beginner');
  const [duration, setDuration] = useState(initialMission?.durationMinutes || 20);
  
  const [modules, setModules] = useState<LearningModule[]>(initialMission?.modules || []);
  const [questions, setQuestions] = useState<Question[]>(initialMission?.questions || []);

  // Helpers to add empty items
  const addModule = () => {
    setModules([...modules, {
      id: `mod_${Date.now()}`,
      title: 'Novo Módulo',
      summary: '',
      icon: 'cpu',
      content: [{ type: 'text', content: '' }],
      references: []
    }]);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      id: `q_${Date.now()}`,
      type: QuestionType.OPEN_ENDED,
      prompt: 'Nova Pergunta',
      context: '',
      validationRegex: '',
      validationError: '',
      correctAnswerCriteria: ''
    }]);
  };

  const handleSave = () => {
    if (!title || !description) return alert('Título e Descrição são obrigatórios');
    
    const newMission: Mission = {
      id: initialMission?.id || `mission_${Date.now()}`, // Preserve ID if editing
      title,
      description,
      difficulty,
      durationMinutes: duration,
      modules,
      questions
    };
    onSave(newMission);
  };

  // Renderers for list items
  const updateModule = (index: number, field: keyof LearningModule, value: any) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setModules(newModules);
  };

  const addContentBlock = (modIndex: number, type: 'text' | 'code' | 'tip') => {
    const newModules = [...modules];
    newModules[modIndex].content.push({ type, content: '' });
    setModules(newModules);
  };

  const removeContentBlock = (modIndex: number, blockIndex: number) => {
    const newModules = [...modules];
    newModules[modIndex].content = newModules[modIndex].content.filter((_, i) => i !== blockIndex);
    setModules(newModules);
  };

  const updateContentBlock = (modIndex: number, blockIndex: number, value: string) => {
    const newModules = [...modules];
    newModules[modIndex].content[blockIndex].content = value;
    setModules(newModules);
  };

  const addReference = (modIndex: number) => {
    const newModules = [...modules];
    newModules[modIndex].references.push({ title: '', url: '' });
    setModules(newModules);
  };

  const removeReference = (modIndex: number, refIndex: number) => {
    const newModules = [...modules];
    newModules[modIndex].references = newModules[modIndex].references.filter((_, i) => i !== refIndex);
    setModules(newModules);
  };

  const updateReference = (modIndex: number, refIndex: number, field: keyof Reference, value: string) => {
    const newModules = [...modules];
    newModules[modIndex].references[refIndex][field] = value;
    setModules(newModules);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-cyber-900 p-8">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            {initialMission ? 'Editar Missão' : 'Criar Nova Missão'}
          </h1>
          <button onClick={onCancel} className="p-2 hover:bg-cyber-800 rounded-full text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* 1. General Info */}
        <section className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-cyber-400 mb-4 flex items-center gap-2">
            <BookOpen size={20} /> Informações Básicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Título da Missão</label>
              <input 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-600 rounded p-2 text-white"
                placeholder="Ex: Introdução a Firewalls"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Descrição</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-600 rounded p-2 text-white h-24"
                placeholder="Breve descrição do cenário..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Dificuldade</label>
              <select 
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as any)}
                className="w-full bg-cyber-900 border border-cyber-600 rounded p-2 text-white"
              >
                <option value="Beginner">Iniciante</option>
                <option value="Intermediate">Intermediário</option>
                <option value="Advanced">Avançado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duração (min)</label>
              <input 
                type="number"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full bg-cyber-900 border border-cyber-600 rounded p-2 text-white"
              />
            </div>
          </div>
        </section>

        {/* 2. Modules */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Módulos de Aprendizado</h2>
            <button onClick={addModule} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 text-sm font-bold">
              <Plus size={16} /> ADICIONAR MÓDULO
            </button>
          </div>
          
          <div className="space-y-4">
            {modules.map((mod, idx) => (
              <div key={mod.id} className="bg-cyber-800 p-6 rounded-xl border border-cyber-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-4">
                    <input 
                      value={mod.title}
                      onChange={e => updateModule(idx, 'title', e.target.value)}
                      className="w-full bg-transparent border-b border-cyber-600 text-lg font-bold text-white focus:border-cyber-400 focus:outline-none mb-2"
                      placeholder="Título do Módulo"
                    />
                    <input 
                      value={mod.summary}
                      onChange={e => updateModule(idx, 'summary', e.target.value)}
                      className="w-full bg-transparent border-b border-cyber-700 text-sm text-gray-400 focus:border-cyber-400 focus:outline-none"
                      placeholder="Resumo curto..."
                    />
                  </div>
                  <button onClick={() => setModules(modules.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-400">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Conteúdo</label>
                  {mod.content.map((block, bIdx) => (
                    <div key={bIdx} className="relative group">
                       <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase mb-1">
                         <span className="flex items-center gap-1">
                           {block.type === 'text' && <Type size={12} />}
                           {block.type === 'code' && <Code size={12} />}
                           {block.type === 'tip' && <AlertCircle size={12} />}
                           {block.type}
                         </span>
                         <button 
                           onClick={() => removeContentBlock(idx, bIdx)} 
                           className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           Remover
                         </button>
                       </div>
                       <textarea 
                          value={block.content}
                          onChange={(e) => updateContentBlock(idx, bIdx, e.target.value)}
                          className={`w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-sm text-gray-300 font-mono focus:border-cyber-500 focus:outline-none ${
                            block.type === 'code' ? 'border-l-4 border-l-blue-500' : 
                            block.type === 'tip' ? 'border-l-4 border-l-yellow-500' : ''
                          }`}
                          rows={3}
                          placeholder={`Conteúdo do bloco (${block.type})...`}
                       />
                    </div>
                  ))}
                  
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => addContentBlock(idx, 'text')} className="flex items-center gap-1 text-xs text-cyber-500 border border-cyber-500/30 px-2 py-1 rounded hover:bg-cyber-500/10">
                      <Plus size={12} /> Texto
                    </button>
                    <button onClick={() => addContentBlock(idx, 'code')} className="flex items-center gap-1 text-xs text-blue-400 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/10">
                      <Code size={12} /> Código
                    </button>
                    <button onClick={() => addContentBlock(idx, 'tip')} className="flex items-center gap-1 text-xs text-yellow-500 border border-yellow-500/30 px-2 py-1 rounded hover:bg-yellow-500/10">
                      <AlertCircle size={12} /> Dica
                    </button>
                  </div>
                </div>

                {/* References Section */}
                <div className="mt-6 pt-6 border-t border-cyber-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono text-gray-500 uppercase">Referências & Leitura Complementar</label>
                    <button 
                      onClick={() => addReference(idx)} 
                      className="flex items-center gap-1 text-xs text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded hover:bg-cyan-500/10"
                    >
                      <Plus size={12} /> Adicionar Referência
                    </button>
                  </div>
                  
                  {mod.references && mod.references.length > 0 ? (
                    <div className="space-y-3">
                      {mod.references.map((ref, rIdx) => (
                        <div key={rIdx} className="flex gap-2 items-start group">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <input 
                                value={ref.title}
                                onChange={(e) => updateReference(idx, rIdx, 'title', e.target.value)}
                                className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-xs text-gray-300 focus:border-cyan-500 focus:outline-none"
                                placeholder="Título da referência..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <input 
                                value={ref.url}
                                onChange={(e) => updateReference(idx, rIdx, 'url', e.target.value)}
                                className="flex-1 bg-cyber-900 border border-cyber-700 rounded p-2 text-xs text-cyan-400 font-mono focus:border-cyan-500 focus:outline-none"
                                placeholder="https://..."
                              />
                              <button 
                                onClick={() => removeReference(idx, rIdx)} 
                                className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-3 border border-dashed border-cyber-700/50 rounded text-gray-600 text-xs">
                      Nenhuma referência adicionada
                    </div>
                  )}
                </div>
              </div>
            ))}
            {modules.length === 0 && (
              <div className="text-center p-8 border-2 border-dashed border-cyber-700 rounded-xl text-gray-500">
                Nenhum módulo criado. Adicione material de estudo para o usuário.
              </div>
            )}
          </div>
        </section>

        {/* 3. Questions */}
        <section className="mb-8">
           <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Desafios (Perguntas)</h2>
            <button onClick={addQuestion} className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 text-sm font-bold">
              <Plus size={16} /> ADICIONAR DESAFIO
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-cyber-800 p-6 rounded-xl border border-cyber-700">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex-1 mr-4">
                     <div className="flex gap-2 mb-2">
                        <span className="bg-cyber-700 px-2 py-1 rounded text-xs text-cyber-300 font-mono">#{idx + 1}</span>
                        <select 
                          value={q.type}
                          onChange={e => updateQuestion(idx, 'type', e.target.value)}
                          className="bg-cyber-900 border border-cyber-600 rounded text-xs text-gray-300 px-2"
                        >
                          <option value={QuestionType.OPEN_ENDED}>Aberta (Validação Regex/IA)</option>
                          <option value={QuestionType.MULTIPLE_CHOICE}>Múltipla Escolha</option>
                        </select>
                     </div>
                     <input 
                        value={q.prompt}
                        onChange={e => updateQuestion(idx, 'prompt', e.target.value)}
                        className="w-full bg-transparent border-b border-cyber-600 text-white font-medium focus:border-cyber-400 focus:outline-none"
                        placeholder="Enunciado da pergunta..."
                      />
                   </div>
                   <button onClick={() => setQuestions(questions.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-400">
                    <Trash2 size={18} />
                  </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Contexto (Opcional)</label>
                      <textarea 
                        value={q.context}
                        onChange={e => updateQuestion(idx, 'context', e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-xs text-gray-300 h-20"
                        placeholder="Código ou cenário adicional..."
                      />
                    </div>
                    
                    {q.type === QuestionType.OPEN_ENDED && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Regex de Validação (Opcional)</label>
                          <input 
                            value={q.validationRegex || ''}
                            onChange={e => updateQuestion(idx, 'validationRegex', e.target.value)}
                            className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-xs font-mono text-yellow-500"
                            placeholder="Ex: ^(?=.*[A-Z]).{8,}$"
                          />
                        </div>
                         <div>
                          <label className="block text-xs text-gray-500 mb-1">Erro de Validação</label>
                          <input 
                            value={q.validationError || ''}
                            onChange={e => updateQuestion(idx, 'validationError', e.target.value)}
                            className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-xs text-red-400"
                            placeholder="Mensagem se o regex falhar"
                          />
                        </div>
                         <div>
                          <label className="block text-xs text-gray-500 mb-1">Critério para IA</label>
                          <input 
                            value={q.correctAnswerCriteria || ''}
                            onChange={e => updateQuestion(idx, 'correctAnswerCriteria', e.target.value)}
                            className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-xs text-gray-300"
                            placeholder="O que a IA deve buscar na resposta?"
                          />
                        </div>
                      </div>
                    )}
                    
                    {q.type === QuestionType.MULTIPLE_CHOICE && (
                      <div className="col-span-2 bg-cyber-900/50 p-2 rounded border border-cyber-700/50 text-center text-gray-500 text-sm">
                        * Edição de opções de Múltipla Escolha simplificada neste editor. Use Pergunta Aberta para prototipagem rápida.
                      </div>
                    )}
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-cyber-900 border-t border-cyber-700 p-4 flex justify-end gap-4 z-10">
          <button 
            onClick={onCancel}
            className="px-6 py-2 text-gray-400 hover:text-white font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 bg-cyber-500 text-cyber-900 font-bold rounded hover:bg-cyber-400 flex items-center gap-2"
          >
            <Save size={18} /> SALVAR MISSÃO
          </button>
        </div>
      </div>
    </div>
  );
};
