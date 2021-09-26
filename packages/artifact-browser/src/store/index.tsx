import { createStore } from 'redux';
import reducer from './reducer';

// ===========================|| REDUX - MAIN STORE ||=========================== //

const store = createStore(reducer);
const persister = 'Demo';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persister };
