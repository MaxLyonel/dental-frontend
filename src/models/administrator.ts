import { RoleModel, UserModel } from ".";


export interface AdministratorModel {
  id: number;
  user: UserModel;
  role: RoleModel;
}

/* FORM */
export interface FormAdministratorModel {
  identityCard: number;
  name: string;
  lastName: string;
  phone: number;
  birthDate: Date | null;
  gender: string;
  roleId: RoleModel | null;
}

/*VALIDATIONS */
export interface FormAdministratorValidations {
  identityCard: [(value: number) => boolean, string];
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  phone: [(value: number) => boolean, string];
  birthDate: [(value: Date) => boolean, string];
  gender: [(value: string) => boolean, string];
  roleId: [(value: RoleModel) => boolean, string];
}