import { Home } from '@/views/home/Home';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { DashboardView } from '@/views/admin/dashboard';
import { PermissionView } from '@/views/admin/permission';
import { RoleView } from '@/views/admin/role';
import { AdministratorView } from '@/views/admin/administrator';
import { PatientView } from '@/views/admin/patient';
import { CalendarView } from '@/views/admin/calendar';
import { ReportView } from '@/views/admin/report';
import { PermissionModel } from '@/models';

export const AppRouter = () => {

    const { roleUser, status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        (status === 'not-authenticated') ?
            <Home />
            :
            <Layout>
                <Routes>
                    <Route path='/dashboardView' element={<DashboardView />} />
                    {
                        roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver permisos") &&
                        <Route path='/permissionsView' element={<PermissionView />} />
                    }
                    {
                        roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver roles") &&
                        <Route path='/rolesView' element={<RoleView />} />
                    }
                    {
                        roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver administradores") &&
                        <Route path='/administratorView' element={<AdministratorView />} />
                    }
                    {
                         <Route path='/ponentView' element={<PatientView />} />
                    }
                    {
                        roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver calendario") &&
                        <Route path='/calendarView' element={<CalendarView />} />
                    }
                    {
                        roleUser.permissions.find((permission: PermissionModel) => permission.name === "ver reportes") &&
                        <Route path='/reportView' element={<ReportView />} />
                    }
                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}
