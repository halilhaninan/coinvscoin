import girisReducer from "./giris";
import { combineReducers } from "redux";

const butunRreducerler = combineReducers({
  giris: girisReducer,
});

export default butunRreducerler;
