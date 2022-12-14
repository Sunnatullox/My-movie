import axios from "axios";
import { Redirect } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
import { toast } from 'react-toastify';

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:5000/api/auth/Admin/login', user)
      console.log(res.data)
      dispatch(loginSuccess(res.data)) 
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.response.data?.msg)
    }
};
