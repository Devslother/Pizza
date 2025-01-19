import { configureStore } from '@reduxjs/toolkit';
import { userSlice, JWT_PERSISTION_STATE } from './user.slice';
import { saveState } from './storage';

export const store = configureStore ({
	reducer: {
		user: userSlice.reducer
	}
});

store.subscribe(() => {
    console.log('Store updated:', store.getState().user.jwt);
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTION_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;