import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
    menuCode: string;
    menuName: string;
}

const initialState: MenuState = {
    menuCode: "1001",
    menuName: "First Menu",
};

const boardMenuReducer = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        getMenu: (state) => {
            return state;
        },
        setMenu: (state, action: PayloadAction<Omit<MenuState, 'menuCode'>>) => {
            state.menuName = action.payload.menuName;
        },
    },
  });
  
  export const { getMenu, setMenu } = boardMenuReducer.actions;
  export default boardMenuReducer.reducer;