import React from 'react';
import { BookOpen, Video, ArrowRight } from 'lucide-react';

interface InstructionsPageProps {
  onContinue: () => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-cyber-800/80 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" />
            Instruções
          </h1>
        </div>

        {/* Seção de Instruções */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Sobre este Objeto de Aprendizagem</h2>
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              Bem-vindo ao <strong>Escape Room - O Desafio do Servidor</strong>! Este é um objeto de 
              aprendizagem interativo projetado para ensinar conceitos fundamentais de redes de computadores 
              e segurança da informação através de uma experiência gamificada.
            </p>
            <p>
              Você assumirá o papel de um técnico de TI que precisa resolver desafios relacionados a 
              protocolos de rede, configurações de servidores, e problemas de segurança. Cada missão 
              apresenta um cenário realista onde você aplicará seus conhecimentos teóricos na prática.
            </p>
            <p>
              Ao longo do jogo, você contará com a ajuda de um mentor virtual que fornecerá dicas e 
              orientações quando necessário. Prepare-se para testar suas habilidades e aprender de forma 
              divertida e desafiadora!
            </p>
          </div>
        </div>

        {/* Seção de Vídeo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Video className="w-6 h-6" />
            Vídeo Tutorial
          </h2>
          <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/l7jQUrR1Pvs"
              title="Vídeo Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Botão Continuar */}
        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="bg-cyber-500 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105"
          >
            Começar Aventura
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
