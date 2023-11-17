import { StageTypeModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const stageTypeSlice = createSlice({
  name: 'stageType',
  initialState: {
    stageTypes: [] as StageTypeModel[],
  },
  reducers: {
    setStageTypes: (state, action) => {
      state.stageTypes = action.payload.stageTypes;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setStageTypes } = stageTypeSlice.actions;