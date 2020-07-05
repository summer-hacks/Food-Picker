import { roomsRef, usersRef } from "../firebase";
import { FETCH_ROOMS, FETCH_USERS } from "./types";

// export const addRoom = newToDo => async dispatch => {
//   roomsRef.push().set(newToDo);
// };

export const fetchUsers = () => async dispatch => {
    usersRef.on("value", snapshot => {
      dispatch({
        type: FETCH_USERS,
        payload: snapshot.val()
      });
    });
};

// export const setNewUserName = (userInfo) => async dispatch => {
//   console.log('userInfo in actions', userInfo);
//   dispatch({
//     type: 'SET_NEW_USER_NAME',
//     fullName: userInfo.firstName + ' ' + userInfo.lastName
//   });
// };

export const clearCurrentUser = () => {
  console.log('clear');
  dispatch({
    type: 'CLEAR_CURRENT_USER',
  })
};

// export const setCurrentUser = () => async dispatch => {
//   todosRef
//     .child(uid)
//     .push()
//     .set(newToDo);
// };

// export const completeToDo = completeToDoId => async dispatch => {
//   roomsRef.child(completeToDoId).remove();
// };

export const fetchRooms = () => async dispatch => {
  roomsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_ROOMS,
      payload: snapshot.val()
    });
  });
};