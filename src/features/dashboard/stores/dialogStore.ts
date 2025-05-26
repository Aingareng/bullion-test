import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DialogMode = "view" | "edit" | null;

interface DialogState {
  isOpen: boolean;
  mode: DialogMode;
}

const initialState: DialogState = {
  isOpen: false,
  mode: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog(state, action: PayloadAction<DialogMode>) {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeDialog(state) {
      state.isOpen = false;
      state.mode = null;
    },
    setDialogMode(state, action: PayloadAction<DialogMode>) {
      state.mode = action.payload;
    },
  },
});

export const { openDialog, closeDialog, setDialogMode } = dialogSlice.actions;
export default dialogSlice.reducer;
