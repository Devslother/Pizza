import { configureStore } from '@reduxjs/toolkit';
import { userSlice, JWT_PERSISTION_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice from './cart.slice';

export const store = configureStore ({
	reducer: {
		user: userSlice.reducer,
		cart: cartSlice,
	}
});

store.subscribe(() => {
    console.log('Store updated:', store.getState().user.jwt);
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTION_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;