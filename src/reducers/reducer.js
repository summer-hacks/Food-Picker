import { FETCH_ROOMS, FETCH_USERS, FETCH_CURRENT_USER } from "../actions/types";

const initialState = {
  currentUser: {
    email: '',
    name: '',
    phoneNum: '',
    rooms: [],
    birthday: {},
    location: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_ROOMS:
          return { rooms: action.payload }
      case FETCH_USERS:
          return { users: action.payload }
      case FETCH_CURRENT_USER:
          return { currentUser: action.payload }
      case 'CLEAR_CURRENT_USER':
          return state;
      default:
          return state;
  }
}

export default reducer;