import { PermissionModel } from ".";

export interface RoleModel {
  id: number;
  name: string;
  description: string;
  state: boolean;
  permissionIds: PermissionModel[];
}

/* FORM */
export interface FormRoleModel {
  name: string;
  description: string;
  permissionIds: PermissionModel[];
}

/*VALIDATIONS */
export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  description: [(value: string) => boolean, string];
  permissionIds: [(value: PermissionModel[]) => boolean, string];
}