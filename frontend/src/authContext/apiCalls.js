import axios from "axios";
import { toast } from "react-toastify";
import { loginFailure, loginStart, loginSuccess, userUpdateFailure, userUpdateStart, userUpdateSuccess } from "./AuthAction";

export const login = async (user, dispatch, setLoginRes) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('https://evening-hamlet-96260.herokuapp.com/api/auth/login', user)
     dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure());
    error.response.data?.msg ? toast.error(error.response.data?.msg) : toast.error(error.response.data?.error) 
    return 

  }
};

export const updateProfile = async (id, data, userData, dispatch) => {
  dispatch(userUpdateStart())
try {
  const userProfileUpdate = await axios.put(
    `https://evening-hamlet-96260.herokuapp.com/api/users/${id}`,data,{
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
