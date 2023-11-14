import { PatientModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patients: [] as PatientModel[],
  },
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload.patients;
    },
    setAddPatient: (state, action) => {
      state.patients = [...state.patients, action.payload.administrator];
    },
    setUpdatePatient: (state, action) => {
      state.patients = [...state.patients.map((e) => {
        if (e.id === action.payload.administrator.id) {
          return {
            ...action.payload.administrator
          }
        }
        return e
      })];
    },
    setDeletePatient: (state, action) => {
      state.patients = [...state.patients.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setPatients, setAddPatient, setUpdatePatient, setDeletePatient } = patientSlice.actions;