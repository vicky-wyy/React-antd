/* eslint-disable import/no-anonymous-default-export */
import { MENU_TOGGLE } from "./actionType";

const defaultStore = {
  menuToggle: false
}

export default (state = defaultStore, action) => {
  switch(action.type){
    case MENU_TOGGLE:
      return { ...state, menuToggle: !state.menuToggle}
    default:
      return state
  }
}