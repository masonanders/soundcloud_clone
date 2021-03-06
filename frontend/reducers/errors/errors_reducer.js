import { combineReducers } from "redux";

import users from "./user_errors_reducer";
import session from "./session_errors_reducer";
import tracks from "./track_errors_reducer";
import comments from "./comment_errors_reducer";
import custom from "./custom_errors_reducer";

export default combineReducers({
  users,
  session,
  tracks,
  comments,
  custom
});
