import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserData } from "../types/dashboard";

interface IUserState {
  users: IUserData[];
  user: IUserData | null;
}

const initialState: IUserState = {
  users: [],
  user: null,
};

export const userStore = createSlice({
  name: "USER_STORE",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserState["users"]>) => {
      state.users = action.payload;
    },
    findUserData: (state, action: PayloadAction<{ id: string }>) => {
      state.user =
        state.users.find((item) => item._id === action.payload.id) ?? null;
    },
  },
});

export const { setUserData, findUserData } = userStore.actions;
export default userStore.reducer;
