import { configureStore } from '@reduxjs/toolkit';
import {
    administratorSlice,
    authSlice,
    patientSlice,
    permissionSlice,
    roleSlice,
    stageTypeSlice,
    thethSlice,
    treatmentSlice,


} from '.';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        permissions: permissionSlice.reducer,
        roles: roleSlice.reducer,
        administrators: administratorSlice.reducer,
        patients: patientSlice.reducer,
        treatments: treatmentSlice.reducer,
        stageTypes: stageTypeSlice.reducer,
        theths: thethSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})