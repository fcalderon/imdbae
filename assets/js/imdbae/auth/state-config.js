import {toAction} from "../util/helpers";
import {authService} from "./service/auth.service";
import {UserService} from "../user/service/user.service";

const AuthActionTypes = {
  GetCurrentUserDone: '[Auth] get current user (done)',
  UpdateLoginForm: '[Auth] Update login form',
  UpdateRegisterForm: '[Auth] Update register form',
  Login: '[Auth] Login',
  LoginError: '[Auth] Error',
  LoginSuccess: '[Auth] Success',
  Register: '[Auth] Register',
  RegisterError: '[Auth] Register error',
  RegisterSuccess: '[Auth] Register success',
  Logout: '[Auth] Logout',
  LogoutSuccess: '[Auth] Logout success'
};

const DEFAULT_STATE = {
  currentUser: undefined,
  token: undefined,
  loginFormData: {
    email: '',
    password: '',
    error: undefined,
    formInvalid: true
  },
  signUpFormData: {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    error: undefined,
    formInvalid: true
  }
};

export const AuthActionCreator = {
  setCurrentUser: user => toAction(AuthActionTypes.GetCurrentUserDone, user),
  updateLoginForm: fieldObject => toAction(AuthActionTypes.UpdateLoginForm, fieldObject),
  authenticate: credentials => toAction(AuthActionTypes.Login, credentials),
  updateSignUpForm: fieldObject => toAction(AuthActionTypes.UpdateRegisterForm, fieldObject),
  register: user => toAction(AuthActionTypes.Register, {user, history}),
  logout: (history) => toAction(AuthActionTypes.Logout, {history})
};


export const AuthDataService = () => next => action => {
  next(action);
  switch (action.type) {
    case AuthActionTypes.Login:
      authService.authenticate(action.payload)
        .then(tokenWrapper => {
          return next(toAction(AuthActionTypes.LoginSuccess, tokenWrapper));
        })
        .catch(error => {
          return next(toAction(AuthActionTypes.LoginError, error));
        });
      break;
    case AuthActionTypes.Register:
      UserService.create(action.payload.user)
        .then(createdUser => {
          authService.authenticate(action.payload.user)
            .then(tokenWrapper => {
              next(toAction(AuthActionTypes.LoginSuccess, tokenWrapper));
              action.payload.history.push('/movies');
            })
            .catch(error => {
              return next(toAction(AuthActionTypes.LoginError, error));
            });
          next(toAction(AuthActionTypes.RegisterSuccess, createdUser));
        })
        .catch(err => {
          return next(toAction(AuthActionTypes.RegisterError, err));
        });
      break;
    case AuthActionTypes.Logout:
      next({type: 'ROOT_RESET'});
      if (action.payload && action.payload.history) {
        action.payload.history.push('login');
      }
      return next(toAction(AuthActionTypes.LogoutSuccess));

  }
};

export function authReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case AuthActionTypes.GetCurrentUserDone:
      return Object.assign({}, state, {currentUser: action.payload});

    case AuthActionTypes.UpdateLoginForm:
      const loginFormData = {...state.loginFormData};
      loginFormData[action.payload.fieldName] = action.payload.fieldValue;
      loginFormData.formInvalid = loginFormInvalid(loginFormData);

      return {...state, loginFormData};

    case AuthActionTypes.LoginSuccess:
      return {
        ...state, currentUser: action.payload.user, token: action.payload.token,
        loginFormData: {...DEFAULT_STATE.loginFormData}
      };

    case AuthActionTypes.LoginError:
      let errorMessage = 'An error occurred, please check your credentials and try again';

      if (action.payload && action.payload.status) {
        // TODO information about the error passed in payload, update message
      }

      return {...state, loginFormData: {...state.loginFormData, error: errorMessage}};

    case AuthActionTypes.UpdateRegisterForm:
      const signUpFormData = {...state.signUpFormData};
      signUpFormData[action.payload.fieldName] = action.payload.fieldValue;
      signUpFormData.formInvalid = signUpFormInvalid(signUpFormData);

      return {...state, signUpFormData};

    case AuthActionTypes.RegisterSuccess:
      return {
        ...state, currentUser: action.payload.user, token: action.payload.token,
        signUpFormData: {...DEFAULT_STATE.signUpFormData}
      };

    case AuthActionTypes.RegisterError:
      let registrationError = 'Error signing up, please verify input and try again';

      if (action.payload) {
        // TODO information about the error passed in payload, update message
      }

      return {
        ...state, signUpFormData: {...state.signUpFormData, error: registrationError}
      };
    case AuthActionTypes.LogoutSuccess:
      return {...state, currentUser: undefined, token: undefined};
    default:
      return state;
  }
}

const MIN_PASSWORD_LENGTH = 8;

function loginFormInvalid(data) {
  return !data || !data.email || data.email.length < 3 || !data.password || data.password.length < MIN_PASSWORD_LENGTH;
}

function signUpFormInvalid(data) {
  return loginFormInvalid(data) || data.password !== data.password_confirmation || !data.name || data.name.length === 0;
}
