import { setAuthToken } from "../../libs/api";
import { IUser } from "../../types/user";
import { createSlice } from "@reduxjs/toolkit";

const initiaslState: IUser = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  picture: "",
  following: [],
  followers:[]
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initiaslState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload
      console.log(payload);
      setAuthToken(payload.token)
      localStorage.setItem("token", payload.token)

      const user: IUser = {
        id: payload.user.id,
        full_name: payload.user.full_name,
        username: payload.user.username,
        email: payload.user.email,
        picture: payload.user.picture,
        following: payload.user.following,
      }
      // localStorage.setItem("user", JSON.stringify(user));
      console.log();

      
      
      return user
    },
    AUTH_CHECK: (_, action) => {
      
      const payload = action.payload

      const user: IUser = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        picture: payload.picture,
      }

      return user
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token")
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token")
    },
  },
})