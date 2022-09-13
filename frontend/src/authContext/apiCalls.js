import axios from "axios";
import { loginFailure, loginStart, loginSuccess, userUpdateFailure, userUpdateStart, userUpdateSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', user)
     dispatch(loginSuccess(res.data))

  } catch (error) {
    dispatch(loginFailure());
  }
};

export const updateProfile = async (id, data,userData, dispatch) => {
  dispatch(userUpdateStart())
try {
  const userProfileUpdate = await axios.put(
    `http://localhost:5000/api/users/${id}`,data,{
      headers: {
        "Content-Type": "application/json",
        Authorization:
        "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
    dispatch(userUpdateSuccess(userProfileUpdate.data))
    localStorage.clear("user")
    const user = userProfileUpdate.data
    localStorage.setItem("user", JSON.stringify({...userData, user}))
    return
} catch (error) {
  dispatch(userUpdateFailure())
}
};
