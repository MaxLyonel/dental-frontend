import { Assessment, CalendarMonth, Group, Home, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        {
            path: "/dashboardView",
            title: "Inicio",
            icon: <Home />
        },
        {
            title: "Tratamientos",
            permission: "show-rent",
            group: [
                {
                    path: "/rentalCalendarView",
                    title: "Calendario",
                    icon: <CalendarMonth />,
                    permission: "show-rates"
                },
                {
                    path: "/rentalView",
                    title: "Tratamientos",
                    icon: <Receipt />,
                    permission: "show-rates"
                }
            ]
        },
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
            ]
        },
        {
            title: "Adminstradores",
            permission: "show-rent",
            group: [
                {
                    path: "/administratorView",
                    title: "Usuarios",
                    icon: <Group />,
                    permission: "show-halls"
                },
                {
                    path: "/rolesView",
                    title: "Roles",
                    icon: <Group />,
                    permission: "show-halls"
                },
                {
                    path: "/permissionsView",
                    title: "Permisos",
                    icon: <Group />,
                    permission: "show-halls"
                },
            ]
        },
        {
            title: "Reportes",
            permission: "show-rent",
            group: [
                {
                    path: "/rent/hallsView",
                    title: "Reportes",
                    icon: <Assessment />,
                    permission: "show-halls"
                }
            ]
        },
    ]
}