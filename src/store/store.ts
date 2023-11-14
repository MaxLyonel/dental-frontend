import { configureStore } from '@reduxjs/toolkit';
import {
    administratorSlice,
    authSlice,
    patientSlice,
    permissionSlice,
    roleSlice,


} from '.';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        permissions: permissionSlice.reducer,
        roles: roleSlice.reducer,
        administrators: administratorSlice.reducer,
        patients: patientSlice.reducer,
        // customers: customerSlice.reducer,
        // products: productSlice.reducer,
        // categories: categorySlice.reducer,
        // unitMeasurements: unitMeasurementSlice.reducer,
        // kardexProducts: kardexProductSlice.reducer,
        // orders: orderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})