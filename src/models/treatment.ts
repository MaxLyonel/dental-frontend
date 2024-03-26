import { PatientModel, PaymentModel, StageTypeModel, ThethModel } from ".";

export interface TreatmentModel {
  id: number;
  description: string;
  date: Date;
  totalAmount: number;
  state: string;
  stageType: StageTypeModel;
  patient: PatientModel;
  payments: PaymentModel[];
  thethIds: ThethModel[];
  amountDue: number;
}

/* FORM */
export interface FormTreatmenttModel {
  patientId: PatientModel | null;
  description: string;
  date: Date | null;
  totalAmount: number;
}

/*VALIDATIONS */
export interface FormTreatmentValidations {
  patientId: [(value: PatientModel[]) => boolean, string];
  description: [(value: string) => boolean, string];
  date: [(value: Date) => boolean, string];
  totalAmount: [(value: number) => boolean, string];
}