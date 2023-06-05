import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./index";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];
function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
