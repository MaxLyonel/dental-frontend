import { PatientModel, StageTypeModel, ThethModel } from ".";

export interface TreatmentModel {
  id: number;
  description: string;
  date: Date;
  totalAmount: number;
  state: string;
  stageType: StageTypeModel;
  thethIds: ThethModel[];
}

/* FORM */
export interface FormTreatmenttModel {
  stageTypeId: StageTypeModel | null;
  patientId: PatientModel | null;
  description: string;
  date: Date | null;
  totalAmount: number;
  thethIds: ThethModel[];
}

/*VALIDATIONS */
export interface FormTreatmentValidations {
  stageTypeId: [(value: StageTypeModel[]) => boolean, string];
  patientId: [(value: PatientModel[]) => boolean, string];
  description: [(value: string) => boolean, string];
  date: [(value: Date) => boolean, string];
  totalAmount: [(value: number) => boolean, string];
  thethIds: [(value: ThethModel[]) => boolean, string];
}