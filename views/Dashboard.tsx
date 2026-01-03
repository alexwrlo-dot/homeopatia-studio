
import React from 'react';
import { 
  Users, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  FileText,
  Clock
} from 'lucide-react';

const Dashboard: React.FC<{ onNewCase: () => void }> = ({ onNewCase }) => {
  const recentCases = [
    { id: '1', name: 'Juan Pérez', date: '2024-05-15', status: 'Nivel 1 - Estable', remedy: 'Lycopodium' },
    { id: '2', name: 'Maria Garcia', date: '2024-05-14', status: 'Agudo - Exaltación', remedy: 'Belladonna' },
    { id: '3', name: 'Carlos Ruiz', date: '2024-05-12', status: 'Nivel 2 - Reactive', remedy: 'Sulphur' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Buenos días, Dr.</h2>
          <p className="text-slate-500">Bienvenido a su centro de metodología clínica.</p>
        </div>
        <button 
          onClick={onNewCase}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-200"
        >
          <ArrowUpRight size={20} />
          <span>Iniciar Nuevo Caso</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Pacientes Totales</p>
          <h3 className="text-2xl font-bold text-slate-800">124</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Citas esta semana</p>
          <h3 className="text-2xl font-bold text-slate-800">18</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">Curaciones Exitosas</p>
          <h3 className="text-2xl font-bold text-slate-800">84%</h3>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            Casos Recientes
          </h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Ver todos</button>
        </div>
        <div className="divide-y divide-slate-50">
          {recentCases.map((c) => (
            <div key={c.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.date} • {c.status}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                  {c.remedy}
                </span>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
