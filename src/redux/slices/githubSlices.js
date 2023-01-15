import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// localStorage.setItem(
//   "accessToken",
//   `${import.meta.env.REACT_APP_GITHUB_TOKEN}`
// );

// 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

// localStorage.setItem(
//   "accessToken",
//   `Bearer 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`
// );

const config = {
  headers: {
    // Authorization: `${localStorage.getItem("accessToken")}`,
    Authorization: `${import.meta.env.REACT_APP_GITHUB_TOKEN}`,
  },
};

// Create actions
// Create action for repos
export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make HTTP call
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=30&sort=asc`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Create action for organziations of an user
export const fetchUserOrgsAction = createAsyncThunk(
  "orgs/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make HTTP call
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/orgs`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Create action for user profile
export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make HTTP call
      const { data } = await axios.get(
        `https://api.github.com/users/${user}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Slices
const reposSlices = createSlice({
  name: "repos",
  initialState: {},
  extraReducers: (builder) => {
    // Repos reducer
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.loading = false;
      state.reposList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state, action) => {
      state.loading = false;
      state.reposList = undefined;
      state.error = action.payload;
    });

    // Orgs reducer
    builder.addCase(fetchUserOrgsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserOrgsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orgs = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchUserOrgsAction.rejected, (state, action) => {
      state.loading = false;
      state.orgs = undefined;
      state.error = action.payload;
    });

    //  Profile reducer
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = undefined;
      state.error = action.payload;
    });
  },
});

export default reposSlices.reducer;
