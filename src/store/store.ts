import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import quizReducer from "./slices/quizSlice"
import profileReducer from "./slices/profileSlice"
import statisticsReducer from "./slices/statisticsSlice"
import settingsReducer from "./slices/settingsSlice"
import achievementsReducer from "./slices/achievementsSlice"

const rootReducer = combineReducers({
  quiz: quizReducer,
  profile: profileReducer,
  statistics: statisticsReducer,
  settings: settingsReducer,
  achievements: achievementsReducer,
})

const persistConfig = {
  key: "master-drive",
  version: 1,
  storage,
  blacklist: ["quiz"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  return store
}

export const store = makeStore()
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
