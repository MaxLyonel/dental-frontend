import { StageTypeModel, ThethModel } from ".";

export interface TreatmentModel {
  id: number;
  description: string;
  date: Date;
  totalAmount: number;
  state: string;
  stageType: StageTypeModel;
  theths: ThethModel[];
}
