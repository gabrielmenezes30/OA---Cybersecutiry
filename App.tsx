import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MissionView } from './components/MissionView';
import { MentorChat } from './components/MentorChat';
import { LoginPage } from './components/LoginPage';
import { InstructionsPage } from './components/InstructionsPage';
import { AdminMissionEditor } from './components/AdminMissionEditor';
import { INITIAL_MISSIONS } from './constants';
import { MissionState, User, Mission } from './types';
import { MessageSquare, Menu } from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenInstructions, setHasSeenInstructions] = useState(false);

  // Content State
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [currentMissionId, setCurrentMissionId] = useState(INITIAL_MISSIONS[0].id);
  const [missionStates, setMissionStates] = useState<Record<string, MissionState>>({});
  
  // UI State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'mission' | 'create'>('mission');
  const [editingMission, setEditingMission] = useState<Mission | null>(null);

  // Logic
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setHasSeenInstructions(false);
  };

  const handleLogout = () => {
    setUser(null);
    setHasSeenInstructions(false);
    setViewMode('mission');
    setEditingMission(null);
  };

  const handleSaveMission = (mission: Mission) => {
    setMissions(prev => {
      const exists = prev.some(m => m.id === mission.id);
      if (exists) {
        return prev.map(m => m.id === mission.id ? mission : m);
      }
      return [...prev, mission];
    });
    setCurrentMissionId(mission.id);
    setViewMode('mission');
    setEditingMission(null);
  };

  const handleMissionUpdate = (newState: MissionState) => {
    setMissionStates(prev => ({
      ...prev,
      [currentMissionId]: newState
    }));
  };

  const handleMissionComplete = () => {
    setMissionStates(prev => {
      const currentState = prev[currentMissionId] || { missionId: currentMissionId, answers: {}, aiFeedback: {}, completed: false, score: 0 };
      return {
        ...prev,
        [currentMissionId]: { ...currentState, completed: true }
      };
    });
  };

  // If not logged in, show Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If logged in but hasn't seen instructions, show Instructions Page
  if (!hasSeenInstructions) {
    return <InstructionsPage onContinue={() => setHasSeenInstructions(true)} />;
  }

  // Derived state
  const currentMission = missions.find(m => m.id === currentMissionId) || missions[0];
  const currentMissionState = missionStates[currentMissionId] || {
    missionId: currentMissionId,
    completed: false,
    score: 0,
    answers: {},
    aiFeedback: {}
  };

  return (
    <div className="flex h-screen bg-cyber-900 text-gray-100 font-sans overflow-hidden">
      
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 md:hidden z-20">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-cyber-800 border border-cyber-700 rounded text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar (Responsive) */}
      <div className={`fixed inset-y-0 left-0 z-10 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          missions={missions}
          currentMissionId={currentMissionId}
          missionStates={missionStates}
          user={user}
          onLogout={handleLogout}
          onSelectMission={(id) => {
            setCurrentMissionId(id);
            setViewMode('mission');
            setIsMobileMenuOpen(false);
          }}
          onCreateMission={() => {
            setEditingMission(null);
            setViewMode('create');
            setIsMobileMenuOpen(false);
          }}
          onEditMission={(mission) => {
            setEditingMission(mission);
            setViewMode('create');
            setIsMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-w-0">
        
        {viewMode === 'create' && user.role === 'admin' ? (
          <AdminMissionEditor 
            initialMission={editingMission}
            onSave={handleSaveMission}
            onCancel={() => {
              setViewMode('mission');
              setEditingMission(null);
            }}
          />
        ) : (
          <>
            <MissionView 
              mission={currentMission}
              missionState={currentMissionState}
              onUpdateState={handleMissionUpdate}
              onComplete={handleMissionComplete}
            />

            {/* Chat Toggle FAB */}
            <button
              onClick={() => setIsChatOpen(true)}
              className={`fixed bottom-6 right-6 p-4 rounded-full bg-cyber-500 text-cyber-900 shadow-lg shadow-cyber-500/20 hover:scale-105 transition-transform z-20 ${isChatOpen ? 'hidden' : 'flex'}`}
            >
              <MessageSquare size={24} />
            </button>

            {/* Chat Panel */}
            <MentorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </>
        )}

      </main>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
