import { TreatmentModel, UserModel } from ".";


export interface PatientModel {
  id: number;
  allergies: string;
  bloodType: string;
  user: UserModel;
  treatmentsIds: TreatmentModel[];
}

/* FORM */
export interface FormPatientModel {
  identityCard: number;
  name: string;
  lastName: string;
  phone: number;
  birthDate: Date | null;
  gender: string;
  allergies: string;
  bloodType: string;
}

/*VALIDATIONS */
export interface FormPatientValidations {
  identityCard: [(value: number) => boolean, string];
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  phone: [(value: number) => boolean, string];
  birthDate: [(value: Date) => boolean, string];
  gender: [(value: string) => boolean, string];
  allergies: [(value: string) => boolean, string];
  bloodType: [(value: string) => boolean, string];
}