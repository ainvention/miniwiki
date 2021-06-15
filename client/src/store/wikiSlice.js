import { createSlice } from "@reduxjs/toolkit";

const initialWikis = sessionStorage.getItem("wikis")
  ? JSON.parse(sessionStorage.getItem("wikis"))
  : null;

export const wikiSlice = createSlice({
  name: "wikis",
  initialState: {
    wikis: initialWikis,
  },
  reducers: {
    setWikis: (state, action) => {
      state.wikis = action.payload;
    },
    addWiki: (state, action) => {
      state.wikis.push(action.payload);
    },
    updateWiki: (state, action) => {
      // state.wikis = state.wikis.filter((w) =>
      // if(w.id === action.payload.id){
      //   wiki.title =
      // }
      // )
    },
    deleteWiki: (state, action) => {
      state.wikis = state.wikis.filter((w) => w.id !== action.payload);
    },
  },
});

export const { setWikis, addWiki, updateWiki, deleteWiki } = wikiSlice.actions;

export default wikiSlice.reducer;
