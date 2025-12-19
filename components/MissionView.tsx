import React, { useState, useEffect } from 'react';
import { Mission, Question, QuestionType, MissionState, LearningModule } from '../types';
import { evaluateAnswer } from '../services/geminiService';
import { 
  ArrowRight, BookOpen, AlertCircle, Check, Code, BrainCircuit, 
  Loader2, CheckCircle, Lock, RotateCcw, XCircle, ChevronLeft, 
  Cpu, Users, Shield, ShieldAlert, Fingerprint, Activity, Terminal, ExternalLink
} from 'lucide-react';

interface MissionViewProps {
  mission: Mission;
  missionState: MissionState;
  onUpdateState: (newState: MissionState) => void;
  onComplete: () => void;
}

// Icon mapper helper
const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'cpu': return <Cpu size={32} />;
    case 'users': return <Users size={32} />;
    case 'lock': return <Lock size={32} />;
    case 'shield-alert': return <ShieldAlert size={32} />;
    case 'fingerprint': return <Fingerprint size={32} />;
    case 'activity': return <Activity size={32} />;
    default: return <Terminal size={32} />;
  }
};

export const MissionView: React.FC<MissionViewProps> = ({ 
  mission, 
  missionState, 
  onUpdateState,
  onComplete
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'challenge'>('learn');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [tempAnswer, setTempAnswer] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Reset local state when mission changes
  useEffect(() => {
    setActiveTab('learn');
    setCurrentQuestionIndex(0);
    setTempAnswer('');
    setLocalError(null);
    setSelectedModule(null);
  }, [mission.id]);

  const handleMultipleChoice = (questionId: string, optionId: string, isCorrect: boolean, explanation: string) => {
    const newState = {
      ...missionState,
      answers: { ...missionState.answers, [questionId]: optionId },
      aiFeedback: { 
        ...missionState.aiFeedback, 
        [questionId]: explanation
      },
      failed: !isCorrect // Set failed state if answer is wrong (Game Over logic)
    };
    
    onUpdateState(newState);
  };

  const handleOpenEndedSubmit = async (question: Question) => {
    if (!tempAnswer.trim()) return;
    setLocalError(null);

    // 1. Local Regex Validation (Google Forms style)
    if (question.validationRegex) {
      try {
        // Extract flags from regex pattern (e.g., (?i) for case-insensitive)
        let pattern = question.validationRegex;
        let flags = '';
        
        // Check for inline flags like (?i)
        const flagMatch = pattern.match(/^\(\?([imsu]+)\)/);
        if (flagMatch) {
          flags = flagMatch[1];
          pattern = pattern.replace(/^\(\?[imsu]+\)/, '');
        }
        
        const regex = new RegExp(pattern, flags);
        if (!regex.test(tempAnswer.trim())) {
          setLocalError(question.validationError || "Resposta inválida.");
          return; // Do not proceed, keep user on input
        }
      } catch (e) {
        console.error("Invalid regex", e);
        setLocalError("Erro na validação. Tente novamente.");
        return;
      }
      
      // If regex passes, mark as correct automatically without AI
      const newState = {
        ...missionState,
        answers: { ...missionState.answers, [question.id]: tempAnswer },
        aiFeedback: { ...missionState.aiFeedback, [question.id]: "Acesso Permitido. Validação concluída." },
        score: (missionState.score || 0) + 100
      };
      onUpdateState(newState);
      setTempAnswer('');
      return;
    }

    // 2. AI Fallback for standard Open Ended questions
    setIsEvaluating(true);
    const result = await evaluateAnswer(question, tempAnswer);
    setIsEvaluating(false);

    const newState = {
      ...missionState,
      answers: { ...missionState.answers, [question.id]: tempAnswer },
      aiFeedback: { ...missionState.aiFeedback, [question.id]: result.feedback },
      score: (missionState.score || 0) + result.score
    };
    
    onUpdateState(newState);
    setTempAnswer(''); 
  };

  const handleResetMission = () => {
    onUpdateState({
      missionId: mission.id,
      completed: false,
      score: 0,
      answers: {},
      aiFeedback: {},
      failed: false
    });
    setCurrentQuestionIndex(0);
    setTempAnswer('');
    setLocalError(null);
    setSelectedModule(null);
    setActiveTab('learn'); // Send user back to learning material on failure
  };

  const isQuestionAnswered = (qId: string) => !!missionState.answers[qId];
  const isMissionFailed = missionState.failed;

  // Check completion
  useEffect(() => {
    if (!missionState.failed) {
      const allAnswered = mission.questions.every(q => !!missionState.answers[q.id]);
      if (allAnswered && !missionState.completed) {
        onComplete();
      }
    }
  }, [missionState.answers, mission.questions, missionState.completed, missionState.failed, onComplete]);

  const currentQuestion = mission.questions[currentQuestionIndex];

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-cyber-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-cyber-800 text-cyber-400 text-xs font-mono rounded border border-cyber-700">
              {mission.difficulty.toUpperCase()}
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <BrainCircuit size={12} /> {mission.durationMinutes} MIN
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{mission.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{mission.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-cyber-700">
          <button
            onClick={() => setActiveTab('learn')}
            className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'learn' 
                ? 'border-cyber-500 text-cyber-400' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              Manual do Servidor
            </div>
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'challenge' 
                ? 'border-cyber-500 text-cyber-400' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
             <div className="flex items-center gap-2">
              <Lock size={16} />
              Terminais de Acesso
            </div>
          </button>
        </div>

        {/* Content Area */}
        
        {/* LEARNING TAB */}
        {activeTab === 'learn' && (
          <div className="animate-fadeIn">
            {!selectedModule ? (
              /* MODULES GRID */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {mission.modules.map((module) => (
                   <button 
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className="flex flex-col items-start text-left p-6 bg-cyber-800 border border-cyber-700 rounded-xl hover:border-cyber-500 hover:bg-cyber-800/80 transition-all group"
                   >
                     <div className="w-12 h-12 rounded-lg bg-cyber-900 border border-cyber-600 flex items-center justify-center text-cyber-500 mb-4 group-hover:scale-110 transition-transform">
                       {getModuleIcon(module.icon)}
                     </div>
                     <h3 className="text-lg font-bold text-gray-100 mb-2">{module.title}</h3>
                     <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                       {module.summary}
                     </p>
                     <div className="text-cyber-400 text-xs font-mono flex items-center gap-1 group-hover:underline">
                       ABRIR MÓDULO <ArrowRight size={12} />
                     </div>
                   </button>
                 ))}
                 
                 {/* Action Call for Tests */}
                 <button
                    onClick={() => setActiveTab('challenge')}
                    className="flex flex-col items-center justify-center p-6 bg-cyber-500/10 border-2 border-dashed border-cyber-500/30 rounded-xl hover:bg-cyber-500/20 hover:border-cyber-500 transition-all text-center"
                 >
                    <h3 className="text-lg font-bold text-cyber-400 mb-2">Pronto para o Exame?</h3>
                    <p className="text-sm text-gray-400 mb-4">Teste seus conhecimentos nos 10 bloqueios de segurança.</p>
                    <div className="px-4 py-2 bg-cyber-500 text-cyber-900 font-bold rounded-lg text-sm">
                      INICIAR DESAFIO
                    </div>
                 </button>
              </div>
            ) : (
              /* MODULE DETAIL VIEW */
              <div className="bg-cyber-800/50 rounded-xl border border-cyber-700/50 overflow-hidden">
                {/* Module Header */}
                <div className="bg-cyber-800 border-b border-cyber-700 p-6 flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="p-2 hover:bg-cyber-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-cyber-500">
                      {getModuleIcon(selectedModule.icon)}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{selectedModule.title}</h2>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-8 space-y-8">
                  {selectedModule.content.map((block, idx) => (
                    <div key={idx} className="animate-slideInRight" style={{ animationDelay: `${idx * 100}ms` }}>
                      {block.title && (
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                           {block.type === 'tip' && <AlertCircle className="text-yellow-500" size={20} />}
                           {block.type === 'code' && <Code className="text-blue-400" size={20} />}
                           {block.title}
                        </h3>
                      )}
                      
                      {block.type === 'code' ? (
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-gray-800 text-sm font-mono text-gray-300">
                          {block.content}
                        </pre>
                      ) : (
                        <div className={`text-gray-300 leading-relaxed whitespace-pre-wrap ${block.type === 'tip' ? 'bg-yellow-900/10 border-l-4 border-yellow-500 pl-4 py-2' : ''}`}>
                          {block.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* References Section */}
                  {selectedModule.references && selectedModule.references.length > 0 && (
                    <div className="pt-8 border-t border-cyber-700 mt-8">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Referências & Leitura Complementar</h4>
                      <div className="grid gap-2">
                        {selectedModule.references.map((ref, i) => (
                          <a 
                            key={i} 
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 hover:underline text-sm transition-colors"
                          >
                            <ExternalLink size={14} />
                            {ref.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHALLENGE TAB */}
        {activeTab === 'challenge' && (
          <div className="animate-fadeIn">
            {/* Progress Bar */}
            <div className="w-full bg-cyber-800 h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${isMissionFailed ? 'bg-red-500' : 'bg-cyber-500'}`}
                style={{ width: `${((currentQuestionIndex + (isQuestionAnswered(currentQuestion.id) ? 1 : 0)) / mission.questions.length) * 100}%` }}
              ></div>
            </div>

            <div className={`border rounded-xl p-8 shadow-lg transition-colors duration-500 ${
              isMissionFailed ? 'bg-red-950/20 border-red-900' : 'bg-cyber-800 border-cyber-700'
            }`}>
              <span className={`${isMissionFailed ? 'text-red-500' : 'text-cyber-500'} font-mono text-xs mb-2 block`}>
                {isMissionFailed ? 'SISTEMA BLOQUEADO' : `TERMINAL ${currentQuestionIndex + 1}/${mission.questions.length}`}
              </span>
              <h3 className="text-xl text-white font-medium mb-6">
                {currentQuestion.prompt}
              </h3>

              {currentQuestion.context && (
                <div className="mb-6 bg-black/40 p-4 rounded border-l-2 border-yellow-500 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                  {currentQuestion.context}
                </div>
              )}

              {/* Multiple Choice */}
              {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = missionState.answers[currentQuestion.id] === opt.id;
                    const hasAnswered = !!missionState.answers[currentQuestion.id];
                    
                    let bgClass = "bg-cyber-700/50 border-cyber-600 hover:bg-cyber-700";
                    if (hasAnswered) {
                      if (opt.isCorrect) bgClass = "bg-green-900/30 border-green-500/50 text-green-200";
                      else if (isSelected && !opt.isCorrect) bgClass = "bg-red-900/30 border-red-500/50 text-red-200";
                      else bgClass = "bg-cyber-800 border-cyber-700 opacity-50";
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={hasAnswered}
                        onClick={() => handleMultipleChoice(currentQuestion.id, opt.id, opt.isCorrect, opt.explanation)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${bgClass}`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{opt.text}</span>
                          {hasAnswered && opt.isCorrect && <Check size={18} className="text-green-500" />}
                          {hasAnswered && isSelected && !opt.isCorrect && <XCircle size={18} className="text-red-500" />}
                        </div>
                        {hasAnswered && (isSelected || opt.isCorrect) && (
                          <div className="mt-2 text-xs opacity-80 pt-2 border-t border-white/10">
                            {opt.explanation}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Open Ended / Code Fix */}
              {(currentQuestion.type === QuestionType.OPEN_ENDED || currentQuestion.type === QuestionType.CODE_FIX) && (
                <div className="space-y-4">
                  {!isQuestionAnswered(currentQuestion.id) ? (
                    <>
                      <textarea
                        className={`w-full h-32 bg-cyber-900 border rounded-lg p-4 text-white focus:ring-2 focus:outline-none font-mono text-sm ${
                          localError ? 'border-red-500 focus:ring-red-500' : 'border-cyber-600 focus:ring-cyber-500'
                        }`}
                        placeholder="Digite a senha ou comando..."
                        value={tempAnswer}
                        onChange={(e) => {
                          setTempAnswer(e.target.value);
                          if (localError) setLocalError(null);
                        }}
                      />
                      
                      {localError && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900/50 animate-shake">
                          <AlertCircle size={16} />
                          {localError}
                        </div>
                      )}

                      <div className="flex justify-end">
                         <button
                          onClick={() => handleOpenEndedSubmit(currentQuestion)}
                          disabled={isEvaluating || !tempAnswer.trim()}
                          className="px-6 py-2 bg-cyber-500 text-cyber-900 font-bold rounded hover:bg-cyber-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isEvaluating ? <Loader2 className="animate-spin" size={18} /> : 'Validar Credencial'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="bg-cyber-900/50 border border-cyber-700 rounded-lg p-6">
                      <div className="text-sm text-gray-400 mb-2">Entrada Registrada:</div>
                      <div className="text-white mb-4 font-mono">"{missionState.answers[currentQuestion.id]}"</div>
                      
                      <div className="h-px bg-cyber-700 w-full my-4"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-cyber-500">
                          <BrainCircuit size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-cyber-400 mb-1">Status do Sistema</div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {missionState.aiFeedback[currentQuestion.id]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Navigation */}
              <div className="mt-8 flex justify-end">
                 {isMissionFailed ? (
                   <button
                     onClick={handleResetMission}
                     className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center gap-2 transition-colors animate-pulse"
                   >
                     <RotateCcw size={18} /> REINICIAR SISTEMA (Tente Novamente)
                   </button>
                 ) : (
                   isQuestionAnswered(currentQuestion.id) && (
                     currentQuestionIndex < mission.questions.length - 1 ? (
                       <button
                         onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                         className="text-white hover:text-cyber-400 font-medium flex items-center gap-2"
                       >
                         Próximo Desafio <ArrowRight size={18} />
                       </button>
                     ) : (
                       <div className="text-green-500 font-bold flex items-center gap-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30">
                         <CheckCircle size={18} /> VOCÊ ESCAPOU!
                       </div>
                     )
                   )
                 )}
              </div>
            </div>
            
            {/* Victory Message */}
            {!isMissionFailed && isQuestionAnswered(currentQuestion.id) && currentQuestionIndex === mission.questions.length - 1 && (
              <div className="mt-8 bg-green-900/30 border border-green-500/50 p-6 rounded-xl text-center animate-bounce-in">
                <h2 className="text-2xl font-bold text-green-400 mb-2">Vitória!</h2>
                <p className="text-gray-300">
                  Parabéns! Você provou ser um Administrador de elite. Todos os sistemas estão seguros.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
