import {toAction} from "../util/helpers";
import {CRUD} from "../util/crud.service";
import {API_URL} from "../util/constants";

const PATH = API_URL + '/matches';

const MatchesActions = {
  getAll: '[Matches] get all (start)',
  getAllDone: '[Matches] get all (done)',
  getAllError: '[Matches] get all (error)',
};

export const MatchesActionCreators = {
  getAll: (userId) => toAction(MatchesActions.getAll, userId)
};

const INITIAL_STATE = {
  matches: {
    data: [],
    loading: false,
    error: undefined
  }
};

export const MatchesDataService = () => next => action => {
  next(action);

  switch (action.type) {
    case MatchesActions.getAll:
      CRUD.get(`${PATH}?userId=${action.payload}`, true)
        .then(res => {
          return next(toAction(MatchesActions.getAllDone, res));
        })
        .catch(err => {
          return next(toAction(MatchesActions.getAllError, err));
        })
  }
};


export const MatchesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MatchesActions.getAll:
      return {...state, matches: {...state.matches, loading: true}};
    case MatchesActions.getAllDone:
      return {...state, matches: {...state.matches, ...action.payload, loading: false}};
    case MatchesActions.getAllError:
      let getAllErrorMessage = 'Error loading matches';
      if (action.payload) {
        // TODO error reason provided, update message accordingly
      }
      return {...state, matches: {...state.matches, error: getAllErrorMessage, loading: false}};
    case 'ROOT_RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};