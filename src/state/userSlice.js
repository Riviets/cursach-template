// state/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    userName: '',
    userEmail: '',
    profileImageUrl: '',
    role: '',
    phoneNumber: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            state.profileImageUrl = action.payload.profileImageUrl;
            state.role = action.payload.role;
            state.phoneNumber = action.payload.phoneNumber;
        },
        clearUser: (state) => {
            state.id = null;
            state.userName = '';
            state.userEmail = '';
            state.profileImageUrl = '';
            state.role = '';
            state.phoneNumber = '';
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
