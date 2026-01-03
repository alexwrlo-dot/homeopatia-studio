
import React, { useState } from 'react';
import { 
  ClipboardList, 
  Activity, 
  Stethoscope, 
  History, 
  PlusCircle, 
  ChevronRight,
  Menu,
  X,
  Search,
  BookOpen,
  Settings
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import NewCaseWizard from './views/NewCaseWizard';
import { StepLevel } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wizard' | 'repertoire' | 'settings'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-600 hover:bg-white hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 bg-white/70 backdrop-blur-md border-r border-slate-200 flex-col p-6 fixed inset-y-0 z-50">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Stethoscope size={24} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            HomaPath Pro
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem id="dashboard" icon={Activity} label="Panel de Control" />
          <NavItem id="wizard" icon={PlusCircle} label="Nueva Consulta" />
          <NavItem id="repertoire" icon={BookOpen} label="Materia Médica" />
        </nav>

        <div className="pt-6 mt-6 border-t border-slate-100">
          <NavItem id="settings" icon={Settings} label="Configuración" />
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Stethoscope className="text-blue-600" size={24} />
          <span className="font-bold text-slate-800">HomaPath Pro</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white p-6 space-y-4 pt-20">
          <NavItem id="dashboard" icon={Activity} label="Panel de Control" />
          <NavItem id="wizard" icon={PlusCircle} label="Nueva Consulta" />
          <NavItem id="repertoire" icon={BookOpen} label="Materia Médica" />
          <NavItem id="settings" icon={Settings} label="Configuración" />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
          {activeTab === 'dashboard' && <Dashboard onNewCase={() => setActiveTab('wizard')} />}
          {activeTab === 'wizard' && <NewCaseWizard />}
          {activeTab === 'repertoire' && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p>Módulo de consulta de Materia Médica en desarrollo...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
