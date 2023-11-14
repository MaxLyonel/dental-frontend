import { createSlice } from '@reduxjs/toolkit';
import { AdministratorModel } from '@/models';

export const administratorSlice = createSlice({
    name: 'administrator',
    initialState: {
        administrators: [] as AdministratorModel[],
    },
    reducers: {
        setAdministrators: (state, action) => {
            state.administrators = action.payload.administrators;
        },
        setAddAdministrator: (state, action) => {
            state.administrators = [...state.administrators, action.payload.administrator];
        },
        setUpdateAdministrator: (state, action) => {
            state.administrators = [...state.administrators.map((e) => {
                if (e.id === action.payload.administrator.id) {
                    return {
                        ...action.payload.administrator
                    }
                }
                return e
            })];
        },
        setDeleteAdministrator: (state, action) => {
            state.administrators = [...state.administrators.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setAdministrators,
    setAddAdministrator,
    setUpdateAdministrator,
    setDeleteAdministrator,
} = administratorSlice.actions;