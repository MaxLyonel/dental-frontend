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
      state.patients = [...state.patients, action.payload.patient];
    },
    setUpdatePatient: (state, action) => {
      state.patients = [...state.patients.map((e) => {
        if (e.id === action.payload.patient.id) {
          return {
            ...action.payload.patient
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