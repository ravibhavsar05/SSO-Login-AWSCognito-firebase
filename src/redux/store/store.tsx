import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Keys } from "../../async-storage/keys";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import rootReducer from "../rootReducer";


const PERSISTED_STATE_VERSION = -1;

const persistConfig = {
  key: Keys.REDUX_PERSIST,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['loginUser','alert'],
  version: PERSISTED_STATE_VERSION,
  debug: __DEV__,
  throttle: 1500,
  migrate: (state: any) => {
    /**
     * IMPORTANT
     * If there is a breaking change to any data structure stored in Redux Persist
     * Create a migration script and increment the PERSISTED_STATE_VERSION:
     * https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
     */
    return Promise.resolve(state);
  },
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancers = [];

if (__DEV__) {
  const reactotron = require('./reactotron').default;
  reactotron.initiate();
  enhancers.push(reactotron.createEnhancer());
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  enhancers,
});

let persistor = persistStore(store);

export {store, persistor};