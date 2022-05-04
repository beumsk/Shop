import { createSlice } from '@reduxjs/toolkit';
import { userRequest } from '../requestMethods';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    updateWishlist: (state, action) => {
      if (
        state.currentUser.wishlist.some((w) => w._id === action.payload._id)
      ) {
        state.currentUser.wishlist.splice(
          state.currentUser.wishlist.findIndex(
            (w) => w._id === action.payload._id
          ),
          1
        );
      } else {
        state.currentUser.wishlist.push(action.payload);
      }
      const syncWishlist = async () => {
        try {
          const res = await userRequest.put('/users/' + state.currentUser._id, {
            wishlist: state.currentUser.wishlist,
          });
        } catch (err) {
          console.error(err);
        }
      };
      // add the wishlist update to the server
      syncWishlist();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  updateWishlist,
} = userSlice.actions;
export default userSlice.reducer;
