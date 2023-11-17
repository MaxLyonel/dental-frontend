import { TreatmentModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const treatmentSlice = createSlice({
  name: 'treatment',
  initialState: {
    treatments: [] as TreatmentModel[],
  },
  reducers: {
    setTreatments: (state, action) => {
      state.treatments = action.payload.treatments;
    },
    setAddTreatment: (state, action) => {
      state.treatments = [...state.treatments, action.payload.treatment];
    },
    setUpdateTreatment: (state, action) => {
      state.treatments = [...state.treatments.map((e) => {
        if (e.id === action.payload.treatment.id) {
          return {
            ...action.payload.treatment
          }
        }
        return e
      })];
    },
    setDeleteTreatment: (state, action) => {
      state.treatments = [...state.treatments.filter(e => e.id != action.payload.id)];
    },
    //corregir
    setRegisterPayment: (state, action) => {
      state.treatments = [...state.treatments.map((treatment: TreatmentModel) => {
        if (treatment.id === action.payload.payment.treatmentId) {
          return ({
            ...treatment,
            payments: [...treatment.payments, action.payload.payment]
          })
        }
        return treatment
      })];
    },
  }
});


// Action creators are generated for each case reducer function
export const { setTreatments, setAddTreatment, setUpdateTreatment, setDeleteTreatment, setRegisterPayment } = treatmentSlice.actions;