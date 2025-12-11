import React from 'react';
import { Mission, MissionState } from '../types';
import { Shield, Lock, Terminal, CheckCircle, Circle, ChevronRight } from 'lucide-react';

interface SidebarProps {
  missions: Mission[];
  currentMissionId: string;
  missionStates: Record<string, MissionState>;
  onSelectMission: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  missions, 
  currentMissionId, 
  missionStates, 
  onSelectMission 
}) => {
  return (
    <div className="w-64 bg-cyber-900 border-r border-cyber-700 h-screen flex flex-col hidden md:flex">
      <div className="p-6 border-b border-cyber-700 flex items-center gap-3">
        <div className="w-8 h-8 bg-cyber-500 rounded flex items-center justify-center text-cyber-900">
          <Shield size={20} fill="currentColor" />
        </div>
        <div>
          <h1 className="font-bold text-gray-100 tracking-tight">CyberEd</h1>
          <p className="text-xs text-cyber-400 font-mono">ESCAPE ROOM</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Desafios</h2>
        
        {missions.map((mission) => {
          const state = missionStates[mission.id];
          const isActive = currentMissionId === mission.id;
          const isCompleted = state?.completed;

          return (
            <button
              key={mission.id}
              onClick={() => onSelectMission(mission.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-cyber-800 border-cyber-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                  : 'bg-transparent border-transparent text-gray-400 hover:bg-cyber-800 hover:text-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${isActive ? 'text-cyber-400' : 'text-gray-600'}`}>
                   {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                </div>
                <div>
                  <h3 className={`font-medium text-sm ${isActive ? 'text-cyber-300' : ''}`}>{mission.title}</h3>
                  <p className="text-xs opacity-70 mt-1 line-clamp-1">{mission.difficulty}</p>
                </div>
              </div>
              
              {isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-500">
                  <ChevronRight size={16} />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyber-700 bg-cyber-800/50">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Terminal size={14} />
          <span>v2.0.0 // ONLINE</span>
        </div>
      </div>
    </div>
  );
};
