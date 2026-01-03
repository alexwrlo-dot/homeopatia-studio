
export enum StepLevel {
  TomaDelCaso = 'TOMA_DEL_CASO',
  SegundoNivel = 'SEGUNDO_NIVEL',
  Seguimiento = 'SEGUIMIENTO',
  CuadroAgudo = 'CUADRO_AGUDO'
}

export interface Symptom {
  id: string;
  description: string;
  category: 'Mental' | 'General' | 'Local';
  timeFrame: 'Historico' | 'Intermedio' | 'Actual';
  score: number;
}

export interface PatientCase {
  id: string;
  name: string;
  date: string;
  anamnesis: string;
  modalities: string[];
  observations: string;
  symptoms: Symptom[];
  remedyCandidates: string[];
  finalPrescription?: string;
  levelDiagnosis?: number;
}

export interface Weighting {
  category: 'Mental' | 'General' | 'Local';
  Historico: number;
  Intermedio: number;
  Actual: number;
}

export const REPERTORIZATION_WEIGHTS: Weighting[] = [
  { category: 'Mental', Historico: 9, Intermedio: 7, Actual: 3 },
  { category: 'General', Historico: 8, Intermedio: 5, Actual: 2 },
  { category: 'Local', Historico: 6, Intermedio: 4, Actual: 1 },
];
