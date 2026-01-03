
import React, { useState } from 'react';
/* Import missing icons from lucide-react */
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2,
  Calculator,
  AlertCircle,
  ClipboardList,
  TrendingUp
} from 'lucide-react';
import { REPERTORIZATION_WEIGHTS, Symptom } from '../types';

const STEPS = [
  'Anamnesis',
  'Trazado del Cuadro',
  'Jerarquización',
  'Materia Médica',
  'Diagnóstico Nivel'
];

const NewCaseWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [anamnesis, setAnamnesis] = useState('');
  const [newSymptomText, setNewSymptomText] = useState('');
  const [newSymptomCategory, setNewSymptomCategory] = useState<'Mental' | 'General' | 'Local'>('Mental');
  const [newSymptomTime, setNewSymptomTime] = useState<'Historico' | 'Intermedio' | 'Actual'>('Actual');

  const addSymptom = () => {
    if (!newSymptomText) return;
    const weight = REPERTORIZATION_WEIGHTS.find(w => w.category === newSymptomCategory)?.[newSymptomTime] || 0;
    const newSymp: Symptom = {
      id: Math.random().toString(36).substr(2, 9),
      description: newSymptomText,
      category: newSymptomCategory,
      timeFrame: newSymptomTime,
      score: weight
    };
    setSymptoms([...symptoms, newSymp]);
    setNewSymptomText('');
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const totalScore = symptoms.reduce((acc, s) => acc + s.score, 0);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Stepper */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
        {STEPS.map((step, idx) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                idx <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden sm:block ${
                idx === currentStep ? 'text-blue-600' : 'text-slate-400'
              }`}>{step}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-4 ${idx < currentStep ? 'bg-blue-600' : 'bg-slate-100'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 min-h-[500px] flex flex-col">
        {/* Step 0: Anamnesis */}
        {currentStep === 0 && (
          <div className="space-y-6 flex-1">
            <div className="flex items-center space-x-2 text-blue-600">
              <Info size={20} />
              <h3 className="font-bold text-xl uppercase tracking-wider text-slate-800">Primer Paso: Toma del Caso</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">Anamnesis / Historia Clínica</label>
                <textarea 
                  value={anamnesis}
                  onChange={(e) => setAnamnesis(e.target.value)}
                  placeholder="Registre aquí el interrogatorio libre y la observación..."
                  className="w-full h-64 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                />
              </div>
              
              <div className="bg-blue-50/50 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-blue-700 flex items-center gap-2">
                  <CheckCircle2 size={18} /> Guía de Modalidades
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-blue-600">
                  <div className="p-2 bg-white rounded-lg shadow-sm">1. Horarios/Frec.</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">2. Clima</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">3. Movimientos</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">4. Ocupaciones</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">5. Posiciones</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">6. Lugares</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">7. Los otros</div>
                  <div className="p-2 bg-white rounded-lg shadow-sm">8. Causa</div>
                </div>
                <div className="pt-4 border-t border-blue-100">
                  <p className="text-sm font-bold text-slate-700 mb-2 italic underline text-blue-800">Interrogatorio sobre síntomas:</p>
                  <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-1">
                    <li>¿Cómo es? ¿De qué? ¿Qué?</li>
                    <li>¿A quién? ¿Por qué? ¿Con quién?</li>
                    <li>¿Con qué? ¿Cuándo? ¿Dónde?</li>
                    <li>¿Qué lo mejora? ¿Qué lo empeora?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Trazado del Cuadro */}
        {currentStep === 1 && (
          <div className="space-y-6 flex-1">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <ClipboardList size={24} className="text-blue-600" />
              Segundo Paso: Trazado del Cuadro de la Enfermedad
            </h3>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[300px]">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Descripción del Síntoma</label>
                <input 
                  type="text" 
                  value={newSymptomText}
                  onChange={(e) => setNewSymptomText(e.target.value)}
                  placeholder="Ej: Miedo a la oscuridad (modalizado)"
                  className="w-full p-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Categoría</label>
                <select 
                  value={newSymptomCategory}
                  onChange={(e) => setNewSymptomCategory(e.target.value as any)}
                  className="p-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Mental">Mentales</option>
                  <option value="General">Generales</option>
                  <option value="Local">Locales</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Temporalidad</label>
                <select 
                  value={newSymptomTime}
                  onChange={(e) => setNewSymptomTime(e.target.value as any)}
                  className="p-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Historico">Histórico/Pres.</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Actual">Actual</option>
                </select>
              </div>
              <button 
                onClick={addSymptom}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h4 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Síntomas Registrados ({symptoms.length})</h4>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                  <Calculator size={16} />
                  Puntuación Estimada: {totalScore}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symptoms.map((s) => (
                  <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between group hover:border-blue-200 transition-all">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block uppercase tracking-wider ${
                        s.category === 'Mental' ? 'bg-purple-50 text-purple-600' : 
                        s.category === 'General' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {s.category} • {s.timeFrame}
                      </span>
                      <p className="font-medium text-slate-800">{s.description}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Valor Metodológico: <span className="font-bold text-slate-600">{s.score}</span></p>
                    </div>
                    <button 
                      onClick={() => removeSymptom(s.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Jerarquización Intelligent logic */}
        {currentStep === 2 && (
          <div className="space-y-6 flex-1">
             <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Tercer Paso: Repertorización Inteligente
            </h3>

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-indigo-800 font-bold mb-4">
                <AlertCircle size={20} />
                Reglas de Jerarquización (1er Nivel)
              </div>
              <ul className="text-sm text-indigo-700/80 space-y-2 list-disc pl-5">
                <li>Seleccionar 3, 4 o 5 síntomas modalizados.</li>
                <li>Rubros repertoriales de 6 medicamentos mínimo y 100 máximo.</li>
                <li>Prescribir medicamento que cubra la mitad más uno de los síntomas.</li>
              </ul>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl mt-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">Jerarquización*</th>
                    <th className="px-6 py-4">Históricos/Pres (Pts)</th>
                    <th className="px-6 py-4">Intermedios (Pts)</th>
                    <th className="px-6 py-4">Actuales (Pts)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {REPERTORIZATION_WEIGHTS.map((w) => (
                    <tr key={w.category}>
                      <td className="px-6 py-4 font-bold text-slate-800">{w.category}</td>
                      <td className="px-6 py-4 text-blue-600">{w.Historico}</td>
                      <td className="px-6 py-4 text-blue-600">{w.Intermedio}</td>
                      <td className="px-6 py-4 text-blue-600">{w.Actual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-50">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-bold transition-all ${
              currentStep === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Anterior</span>
          </button>
          
          <button 
            onClick={() => {
              if (currentStep < STEPS.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                alert('¡Caso Finalizado con Éxito!');
              }
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <span>{currentStep === STEPS.length - 1 ? 'Finalizar y Guardar' : 'Siguiente'}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCaseWizard;
