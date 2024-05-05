import { createSlice } from "@reduxjs/toolkit";

interface details {
    profilePic: {
        url: string,
        id: string,
    },
    _id: string,
    email: string,
    username: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
}

interface user {
    details?: details,
    token?: string | null,
}
const initialState: user = {}
/**THEME DETAILS SLICE */
export const UserSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setUser: (state, { payload }: { payload: details }) => {
            state.details = {
                ...state.details,
                ...payload,
            };
        },
        setAuth: (state, { payload }: { payload: string | null }) => {
            state.token = payload;
        }
    },
});

/**ACTIONS FOR SLICE*/
export const { setUser, setAuth } = UserSlice.actions;
