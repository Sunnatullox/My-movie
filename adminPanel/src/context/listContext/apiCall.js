import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListsFailure,
  deleteListsStart,
  deleteListsSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./ListActions";
import axios from "axios";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());

  try {
    const res = await axios.get("https://evening-hamlet-96260.herokuapp.com/api/lists", {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure(error));
  }
};

// Create

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("https://evening-hamlet-96260.herokuapp.com/api/lists/", list, {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure(error));
  }
};

// delete

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListsStart());

  try {
    await axios.delete("/api/lists/" + id, {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteListsSuccess(id));
  } catch (error) {
    dispatch(deleteListsFailure(error));
  }
};
