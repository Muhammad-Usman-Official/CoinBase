import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types";

const initialState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: TUser, action: PayloadAction<TUser>) => {
      const { _id, email, username, auth } = action.payload;

      state._id = _id;
      state.email = email;
      state.username = username;
      state.auth = auth;
    },
    resetUser: (state: TUser) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.auth = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
