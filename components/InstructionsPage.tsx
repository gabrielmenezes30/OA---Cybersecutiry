import React from 'react';
import { BookOpen, FileText, Image, Video, CheckCircle } from 'lucide-react';

interface InstructionsPageProps {
  onContinue: () => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-cyber-900 text-gray-100 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyber-500 rounded-full mb-4">
            <BookOpen size={32} className="text-cyber-900" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-cyber-400">
            Instruções do Objeto de Aprendizagem
          </h1>
          <p className="text-lg text-gray-300">
            Antes de começar, leia atentamente as orientações abaixo
          </p>
        </div>

        {/* Apresentação Section */}
        <section className="mb-10 bg-cyber-800/50 rounded-lg p-6 border border-cyber-700">
          <h2 className="text-2xl font-bold mb-4 text-cyber-400 flex items-center gap-2">
            <CheckCircle size={24} />
            Apresentação
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Nome do OA e breve descrição do objetivo de aprendizagem:</strong> Este é um Escape Room educacional sobre Cibersegurança, onde você aprenderá conceitos fundamentais de segurança digital através de desafios práticos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Contextualização do tema:</strong> A importância da cibersegurança na educação e no mundo digital moderno é fundamental para proteger dados e sistemas.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Público-alvo:</strong> Professores da educação básica, ensino técnico, estudantes e profissionais interessados em aprender sobre segurança digital.</span>
            </li>
          </ul>
        </section>

        {/* Orientação em texto Section */}
        <section className="mb-10 bg-cyber-800/50 rounded-lg p-6 border border-cyber-700">
          <h2 className="text-2xl font-bold mb-4 text-cyber-400 flex items-center gap-2">
            <FileText size={24} />
            Orientação em texto
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Texto explicativo claro e objetivo:</strong> Cada módulo apresenta conceitos de forma didática e progressiva.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Linguagem adequada ao público:</strong> Evitamos jargões técnicos sem explicação para facilitar o aprendizado.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Referências teóricas:</strong> Indicação de fontes usadas para embasar o conteúdo (seguindo normas da ABNT).</span>
            </li>
          </ul>
        </section>

        {/* Elementos visuais Section */}
        <section className="mb-10 bg-cyber-800/50 rounded-lg p-6 border border-cyber-700">
          <h2 className="text-2xl font-bold mb-4 text-cyber-400 flex items-center gap-2">
            <Image size={24} />
            Elementos visuais
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Imagens ilustrativas:</strong> Mapas mentais, fluxogramas, infográficos, capturas de tela, diagramas etc.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Gráficos:</strong> Quando couber (comparações, resultados de pesquisa etc.).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Acessibilidade:</strong> Todos os elementos visuais devem ter <strong>legenda e descrição alternativa (alt text)</strong> para acessibilidade.</span>
            </li>
          </ul>
        </section>

        {/* Recurso audiovisual Section */}
        <section className="mb-10 bg-cyber-800/50 rounded-lg p-6 border border-cyber-700">
          <h2 className="text-2xl font-bold mb-4 text-cyber-400 flex items-center gap-2">
            <Video size={24} />
            Recurso audiovisual
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Vídeo original:</strong> Pelo menos um vídeo (curto, 3–5 minutos) explicando um conceito, apresentando um tutorial ou exemplo prático.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Formato flexível:</strong> Pode ser gravado com o celular, com slides narrados ou com captura de tela.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-500 font-bold">•</span>
              <span><strong>Acessibilidade audiovisual:</strong> Deve ter <strong>legenda</strong>, e, se possível, <strong>tradução em Libras</strong> (pode usar recursos gratuitos como VLibras) ou transcrição textual.</span>
            </li>
          </ul>
        </section>

        {/* Importante Notice */}
        <div className="bg-gradient-to-r from-cyber-500/20 to-purple-500/20 rounded-lg p-6 border-2 border-cyber-500 mb-10">
          <h3 className="text-xl font-bold mb-3 text-cyber-400">📌 Importante</h3>
          <p className="text-gray-200 leading-relaxed">
            Este Escape Room foi desenvolvido seguindo princípios pedagógicos modernos e de acessibilidade. 
            Navegue pelos módulos, resolva os desafios e utilize o chat com o mentor sempre que precisar de ajuda. 
            Seu progresso será salvo automaticamente.
          </p>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-500 to-purple-500 text-white font-bold text-lg rounded-lg hover:scale-105 transition-transform shadow-lg shadow-cyber-500/30"
          >
            <CheckCircle size={24} />
            Entendi, vamos começar!
          </button>
        </div>

      </div>
    </div>
  );
};
