import { createSlice } from "@reduxjs/toolkit";

interface loading {
    loading: boolean,
}
const initialState: loading = {
    loading: false,
}
/**THEME DETAILS SLICE */
export const LoadingSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setLoading: (state, { payload }: { payload: boolean }) => {
            state.loading = payload;
        },
    },
});

/**ACTIONS FOR SLICE*/
export const { setLoading } = LoadingSlice.actions;
