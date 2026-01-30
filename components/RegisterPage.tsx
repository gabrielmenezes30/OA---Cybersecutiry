import React, { useState } from 'react';
import { Shield, Lock, Terminal, Mail, User as UserIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onBackToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onBackToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return false;
    }

    if (username.length < 3) {
      setError('Nome de usuário deve ter pelo menos 3 caracteres');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido');
      return false;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('cyberEdUsers') || '[]');

    // Check if username already exists
    if (existingUsers.some((u: any) => u.username === username)) {
      setError('Nome de usuário já está em uso');
      return;
    }

    // Check if email already exists
    if (existingUsers.some((u: any) => u.email === email)) {
      setError('Email já está cadastrado');
      return;
    }

    // Create new user
    const newUser = {
      username,
      email,
      password, // In production, this should be hashed!
      role: 'user' as const,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('cyberEdUsers', JSON.stringify(existingUsers));

    setSuccess(true);

    // Auto login after 1.5 seconds
    setTimeout(() => {
      onRegister({ username, role: 'user' });
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cyber-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-[128px]"></div>
        </div>

        <div className="w-full max-w-md bg-cyber-800/80 backdrop-blur-md border border-cyber-700 rounded-2xl p-8 shadow-2xl z-10 text-center">
          <div className="w-20 h-20 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Registro Concluído!</h2>
          <p className="text-gray-400">Sua conta foi criada com sucesso.</p>
          <p className="text-cyber-500 mt-4 animate-pulse">Entrando no sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyber-500 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-[128px]"></div>
      </div>

      <div className="w-full max-w-md bg-cyber-800/80 backdrop-blur-md border border-cyber-700 rounded-2xl p-8 shadow-2xl z-10">
        <button 
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Voltar ao Login</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-cyber-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cyber-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transform -rotate-3">
            <Shield size={40} className="text-cyber-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Criar <span className="text-cyber-500">Conta</span></h1>
          <p className="text-gray-400 mt-2">Registre-se no CyberEd System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Nome de Usuário</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="Escolha um nome de usuário"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-400 uppercase tracking-wider ml-1">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-cyber-500 focus:ring-1 focus:ring-cyber-500 focus:outline-none transition-all"
                placeholder="Repita sua senha"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyber-600 to-cyber-500 hover:from-cyber-500 hover:to-cyber-400 text-cyber-900 font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            CRIAR CONTA
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-cyber-700/50 text-center">
          <p className="text-sm text-gray-400">
            Já tem uma conta?{' '}
            <button 
              onClick={onBackToLogin}
              className="text-cyber-500 hover:text-cyber-400 font-semibold"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
