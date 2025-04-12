export type TPrediction = {
  condition: string;
  positive: boolean;
  score: number;
};

export type THistory = {
  doctorEmail: string;
  patientName: string;
  patientAge: string;
  patientHeight: string;
  patientWeight: string;
  prediction: TPrediction[];
};
