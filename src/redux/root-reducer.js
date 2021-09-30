import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import registerReducer from "./register/register.reducer";
import userReducer from "./user/user.reducer";
import dataReducer from "./data/data.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const appReducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  data: dataReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") state = undefined;

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
