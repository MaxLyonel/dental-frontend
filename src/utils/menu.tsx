import { useAuthStore } from "@/hooks";
import { PermissionModel } from "@/models";
import { Assessment, CalendarMonth, Group, Home } from "@mui/icons-material"

export const menu = () => {

  const { roleUser } = useAuthStore();

  const menuItems = [
    {
      path: "/dashboardView",
      title: "Inicio",
      icon: <Home />
    },
    (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver calendario") &&
    {
      title: "Tratamientos",
      permission: "show-rent",
      group: [
        {
          path: "/calendarView",
          title: "Calendario",
          icon: <CalendarMonth />,
          permission: "show-rates"
        },
      ].filter(groupItem => groupItem !== undefined)
    }),
    (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver pacientes") &&
    {
      title: "Clientes",
      permission: "show-rent",
      group: [
        {
          path: "/patientView",
          title: "Pacientes",
          icon: <Group />,
          permission: "show-halls"
        },
      ].filter(groupItem => groupItem !== undefined)
    }),
    (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver administradores") ||
      roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver roles") ||
      roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver permisos")) && {
      title: "Adminstradores",
      permission: "show-rent",
      group: [
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver administradores") &&
        {
          path: "/administratorView",
          title: "Usuarios",
          icon: <Group />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver roles") &&
        {
          path: "/rolesView",
          title: "Roles",
          icon: <Group />,
          permission: "show-halls"
        }),
        (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver permisos") &&
        {
          path: "/permissionsView",
          title: "Permisos",
          icon: <Group />,
          permission: "show-halls"
        }),
      ].filter(groupItem => groupItem !== undefined)
    },
    (roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver reportes") &&
    {
      title: "Reportes",
      permission: "show-rent",
      group: [
        {
          path: "/reportView",
          title: "Reportes",
          icon: <Assessment />,
          permission: "show-halls"
        }
      ].filter(groupItem => groupItem !== undefined)
    }),
  ]
  return menuItems.filter(item => item !== undefined);
}