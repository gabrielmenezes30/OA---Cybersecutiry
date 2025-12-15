import React, { useState } from 'react';
import { Shield, Lock, Terminal } from 'lucide-react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin({ username: 'Administrador', role: 'admin' });
    } else if (username === 'user' && password === 'user') {
      onLogin({ username: 'Estudante', role: 'user' });
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyber-500 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-[128px]"></div>
      </div>

      <div className="w-full max-w-md bg-cyber-800/80 backdrop-blur-md border border-cyber-700 rounded-2xl p-8 shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-cyber-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cyber-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transform rotate-3">
            <Shield size={40} className="text-cyber-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CyberEd <span className="text-cyber-500">System</span></h1>
          <p className="text-gray-400 mt-2">Portal de Acesso Seguro</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Identificação</label>
            <div className="relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="Usuário"
              />
            </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Chave de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="Senha"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyber-600 to-cyber-500 hover:from-cyber-500 hover:to-cyber-400 text-cyber-900 font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            ACESSAR SISTEMA
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-cyber-700/50 text-center">
          <p className="text-xs text-gray-500 mb-2 font-mono">CREDENCIAIS DE DEMONSTRAÇÃO</p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span className="bg-cyber-900/50 px-3 py-1 rounded border border-cyber-700/50">admin / admin</span>
            <span className="bg-cyber-900/50 px-3 py-1 rounded border border-cyber-700/50">user / user</span>
          </div>
        </div>
      </div>
    </div>
  );
};
