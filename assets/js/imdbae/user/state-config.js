import {toAction} from "../util/helpers";
import {UserService} from "./service/user.service";

const UserActionTypes = {
  UpdateUser: '[User] Update (start)',
  UpdateUserSuccess: '[User] Update (success)',
  UpdateUserError: '[User] Update (start)',
  LoadUser: '[User] Load (start)',
  LoadUserSuccess: '[User] Load (success)',
  LoadUserError: '[User] Load (error)',
  UpdateUserForm: '[User] Update form'
};

export const UserActionCreators = {
  updateUser: user => toAction(UserActionTypes.UpdateUser, user),
  loadUser: userId => toAction(UserActionTypes.LoadUser, userId),
  updateUserForm: formField => toAction(UserActionTypes.UpdateUserForm, formField)
};

export const UserDataService = () => next => action => {
  next(action);
  switch (action.type) {
    case UserActionTypes.UpdateUser:
      UserService.update(action.payload)
        .then(updated => next(toAction(UserActionTypes.UpdateUserSuccess, updated)))
        .catch(err => next(toAction(UserActionTypes.UpdateUserError, err)));
      break;
    case UserActionTypes.LoadUser:
      UserService.get(action.payload)
        .then(updated => next(toAction(UserActionTypes.LoadUserSuccess, updated)))
        .catch(err => next(toAction(UserActionTypes.LoadUserError, err)));
      break;
  }
};

const DEFAULT_STATE = {
  selectedUser: {
    data: undefined,
    loading: false,
    error: undefined
  },
  userForm: {
    error: undefined,
    loading: false,
    name: '',
    email: '',
    loc_lon: null,
    loc_lat: null,
    loc_from_ip: false,
    distance: 0,
    formInvalid: true
  }
};

export const UserReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LoadUser:
      return {...state, selectedUser: {...state.selectedUser, loading: true, error: undefined}};
    case UserActionTypes.LoadUserSuccess:
      return {
        ...state,
        selectedUser: {...action.payload, loading: false, error: undefined},
        userForm: {...state.userForm, ...action.payload.data, loading: false, error: undefined}
      };
    case UserActionTypes.LoadUserError:
      let loadUserErrorMessage = 'Error loading user, try again later';
      if (action.payload) {
        // TODO more details regarding the error provided, update message appropriately
      }

      return {
        ...state, selectedUser: {...state.selectedUser, loading: false, error: loadUserErrorMessage}
      };
    case UserActionTypes.UpdateUser:
      return {
        ...state, userForm: {...state.userForm, loading: true, error: undefined}
      };
    case UserActionTypes.UpdateUserSuccess:
      return {
        ...state,
        userForm: {...state.userForm, ...action.payload, loading: false, error: undefined},
        selectedUser: {...state.selectedUser, ...action.payload, error: undefined, loading: false}
      };
    case UserActionTypes.UpdateUserError:
      let updateErrorMessage = 'Error updating user, please try again later';
      if (action.payload) {
        // TODO more details regarding the error provided, update message appropriately
      }

      return {
        ...state, userForm: {...state.userForm, loading: false, error: updateErrorMessage}
      };
    case UserActionTypes.UpdateUserForm:
      const userForm = {...state.userForm};

      userForm[action.payload.fieldName] = action.payload.fieldValue;
      userForm.formInvalid = formInvalid(userForm);

      return {
        ...state,
        userForm: userForm
      };
    default:
      return state;
  }
};


function formInvalid(formData) {
  return !formData
    || !formData.name
    || formData.name.length === 0
    || !formData.email
    || formData.email.length === 0;
}