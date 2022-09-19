
export const loginStart = () => ({
    type:"LOGIN_START"
});
export const loginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user
});
export const loginFailure = () => ({
    type:"LOGIN_FAILURE",

})
export const userUpdateStart = () => ({
    type:"USER_UPDATE_START"
});
export const userUpdateSuccess = (user) => ({
    type:"USER_UPDATE_SUCCESS",
    payload: user
});
export const userUpdateFailure = () => ({
    type:"USER_UPDATE_FAILURE",

})

//  Log Out
export const logoutStart = () => ({
    type:"LOGOUT"
});