import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import twoDigitsNumber from '../../../Utilities/TwoDigitsNumber';

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async ({
    numOfRepos = 10,
    language = 'Any',
    date = new Date('2000-01-01'),
    page = 1,
  }) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=stars:>=500+language:${encodeURIComponent(
        language,
      )}+created:>=${date.getFullYear()}-${twoDigitsNumber(
        date.getMonth() + 1,
      )}-${twoDigitsNumber(
        date.getDate(),
      )}&sort=stars&order=desc&per_page=${numOfRepos}&page=${page}`,
    ).catch(err => alert(err));
    const result = await response.json().catch(err => alert(err));
    return result;
  },
);

export const reposApiSlice = createSlice({
  name: 'repos',
  initialState: {
    data: [],
    status: 'null',
    page: 1,
  },
  reducers: {
    nextPage: state => {
      state.page += 1;
    },
    previousPage: state => {
      state.page > 1 && (state.page -= 1);
    },
    firstPage: state => {
      state.page = 1;
    },
  },
  extraReducers: {
    [fetchRepos.fulfilled]: (state, {payload}) => {
      state.data = payload;
      state.status = 'success';
    },
    [fetchRepos.pending]: state => {
      state.status = 'loading';
    },
    [fetchRepos.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export const {nextPage, previousPage, firstPage} = reposApiSlice.actions;

export default reposApiSlice.reducer;
