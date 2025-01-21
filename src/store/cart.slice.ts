import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { RootState } from './store';

export const CART_PERSISTION_STATE = 'cartData'

export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTION_STATE)?? {
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
			} else {
				existed.count += 1;
			}
		},
		decrease: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (existed) {
				existed.count -= 1;

				if (existed.count === 0) {
					state.items = state.items.filter(item => item.id !== action.payload);
				}
			}
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		},
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalCount = createSelector(
	selectCartItems,
	(items) => items.reduce((acc, item) => acc + item.count, 0)
);