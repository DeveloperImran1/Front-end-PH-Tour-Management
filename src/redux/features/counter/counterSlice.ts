import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // aikhane amar buisnes er bivinno login likhte hobe, kokhon kono ki kaj korbo.
    increment: (state) => {
      // perameter er state er moddhe initialState er value ke pabo.
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    incrementAmount: (state, action) => {
      // perameter er state er moddhe initialState er value ke pabo.
      state.count = state.count + action.payload;
    },
    decrementAmount: (state, action) => {
      state.count = state.count - action.payload;
    },
  },
});

export const { increment, decrement, incrementAmount, decrementAmount } =
  counterSlice.actions; // counterSlice.reducers er moddhe jei property gulo ase, taderke counterSlice.actions er moddhe pawa jai.

export default counterSlice.reducer; // [Note: aikhanecounterSlice.reducer aita kinto Uporer counterSlice.reducers noi. I mean lasta s word a nai. Tarmane createSlice method ta ja return kore, seikhan theke ai reducer ke newa hoiace.]
