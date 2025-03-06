import { createStore, applyMiddleware } from "redux";
import { loggerMiddleware } from "./loggerMiddleware";
import { GAME_STAT } from '../constants/en';

export const SET_USER_NAME = "SET_USER_NAME";
export const LOGOUT = "LOGOUT";
export const SET_GAME_TYPE = "SET_GAME_TYPE";
export const SET_GAME_STEP = "SET_GAME_STEP";
export const SET_CELL_VALUE = "SET_CELL_VALUE";
export const SET_GAME_STAT = "SET_GAME_STAT";
export const SET_WIN = "SET_WIN";
export const SET_FAIL = "SET_FAIL";
export const SET_DRAW = "SET_DRAW";

const STORAGE = {
  USER_NAME: "user_name",
  GAME_TYPE: "game_type",
  CELL_VALS: "cell_vals",
  WINS: "wins",
  LOSSES: "losses",
  DRAWS: "draws"
};

const getLocalStorage = (key, defaultValue = "") => localStorage.getItem(key) || defaultValue;
const getLocalStorageNumber = (key) => parseInt(localStorage.getItem(key) || "0");

const initialState = {
  game_step: !getLocalStorage(STORAGE.USER_NAME) ? "set_name" : getLocalStorage(STORAGE.GAME_TYPE) ? "start_game" : "set_game_type",
  game_type: getLocalStorage(STORAGE.GAME_TYPE),
  curr_user: { 
    name: getLocalStorage(STORAGE.USER_NAME), 
    wins: getLocalStorageNumber(STORAGE.WINS),
    losses: getLocalStorageNumber(STORAGE.LOSSES),
    draws: getLocalStorageNumber(STORAGE.DRAWS),
  },
  cell_vals: JSON.parse(getLocalStorage(STORAGE.CELL_VALS, "{}")),
  game_stat: GAME_STAT.START_GAME
};


const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      localStorage.setItem(STORAGE.USER_NAME, action.payload);
      return Object.assign({}, state, { 
        curr_user: { name: action.payload }, 
        game_step: "set_game_type" 
    });

    case LOGOUT:
      Object.values(STORAGE).forEach((key) => localStorage.removeItem(key));
      return Object.assign({}, state, { 
        game_step: "set_name" ,
        game_type: "",
        curr_user: { name: "" }, 
        cell_vals: {},
        game_stat: GAME_STAT.START_GAME
    });

    case SET_GAME_TYPE:
      localStorage.setItem(STORAGE.GAME_TYPE, action.payload);
      if (action.payload.length == 0) {
        localStorage.removeItem(STORAGE.GAME_TYPE);
      }
      return Object.assign({}, state, { 
        game_type: action.payload, 
        game_step: (action.payload.length == 0) ? "set_game_type" : "start_game" 
    });

    case SET_GAME_STEP:
      return Object.assign({}, state, { 
        game_step: action.payload 
     });

    case SET_CELL_VALUE:
        const updatedCellVals = Object.assign({}, state.cell_vals, action.payload);
        const aa = 
        Object.assign({}, state, {
            cell_vals: updatedCellVals
          });
        return Object.assign({}, state, {
          cell_vals: aa['cell_vals']
        });
    
    case SET_WIN:
      const newWin = parseInt(state.curr_user.wins || 0) + 1;
      localStorage.setItem(STORAGE.WINS, newWin);
        return Object.assign({}, state, { 
            curr_user: Object.assign({}, state.curr_user, { 
            wins: newWin
            })
        });
    
    case SET_FAIL:
      const newFail = parseInt(state.curr_user.losses || 0) + 1;
      localStorage.setItem(STORAGE.LOSSES, newFail);
        return Object.assign({}, state, { 
            curr_user: Object.assign({}, state.curr_user, { 
            losses: newFail
            })
        });
    
    case SET_DRAW:
      const newDraw = parseInt(state.curr_user.draws || 0) + 1;
      localStorage.setItem(STORAGE.DRAWS,  newDraw);
        return Object.assign({}, state, { 
            curr_user: Object.assign({}, state.curr_user, { 
            draws: newDraw
            })
        });

    case SET_GAME_STAT:
        localStorage.removeItem(STORAGE.CELL_VALS);
        return Object.assign({}, state, {
            cell_vals: {},
            game_stat: action.payload
        });

    default:
      return state;
  }
};


const store = createStore(gameReducer, applyMiddleware(loggerMiddleware));

export default store;
