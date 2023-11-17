import { ThethModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const thethSlice = createSlice({
  name: 'theth',
  initialState: {
    theths: [] as ThethModel[],
  },
  reducers: {
    setTheths: (state, action) => {
      state.theths = action.payload.theths;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setTheths } = thethSlice.actions;