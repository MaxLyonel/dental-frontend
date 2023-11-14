import { Home } from '@/views/home/Home';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { DashboardView } from '@/views/admin/dashboard/DashboardView';
import { PermissionView } from '@/views/admin/permission';
import { RoleView } from '@/views/admin/role';
import { AdministratorView } from '@/views/admin/administrator';
import { PatientView } from '@/views/admin/patient';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
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
                    <Route path='/permissionsView' element={<PermissionView />} />
                    <Route path='/rolesView' element={<RoleView />} />
                    <Route path='/administratorView' element={<AdministratorView />} />
                    <Route path='/patientView' element={<PatientView />} />
                    {/* <Route path='/customerCreditsView' element={<CustomerCreditsView />} /> */}
                    {/* <Route path='/productsView' element={<ProductsView />} /> */}
                    {/* <Route path='/movementsView' element={<MovementsView />} /> */}
                    {/* <Route path='/salesView' element={<SalesView />} /> */}
                    {/* <Route path='/orderView' element={<OrderView />} /> */}

                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}
