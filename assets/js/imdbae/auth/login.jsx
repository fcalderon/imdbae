import React from 'react';
import {connect} from "react-redux";
import {AuthActionCreator} from "./state-config";
import {Link} from "react-router-dom";
import {UncontrolledAlert} from "reactstrap";


const stateToProps = state => {
  return {
    credentials: state.auth.loginFormData,
    error: state.auth.loginFormData.error
  }
};
const dispatchToProps = dispatch => {
  return {
    onChange: fieldObject => dispatch(AuthActionCreator.updateLoginForm(fieldObject)),
    handleLogin: credentials => dispatch(AuthActionCreator.authenticate(credentials))
  }
};

export const Login = connect(stateToProps, dispatchToProps)((props) => {
  return (<div className={'card'}>
    <div className={'card-body'}>
      <h5>Login</h5>
      {
        props.error
          ?
          <UncontrolledAlert color={'danger'}>
            {props.error}
          </UncontrolledAlert>
          :
          <div/>
      }
      <form>
        <div className={'form-group'}>
          <label htmlFor={'email-field'}>Email</label>
          <input id="email-field" className={'form-control'} type="email"
                 onChange={($ev) => { props.onChange({ fieldName: 'email', fieldValue: $ev.target.value}) }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'password-field'}>Password</label>
          <input id="password-field" className={'form-control'} type="password"
                 onChange={($ev) => { props.onChange({ fieldName: 'password', fieldValue: $ev.target.value}) }}/>
        </div>
      </form>
      <button className={'btn btn-primary'} onClick={() => {
        props.handleLogin(props.credentials)
      }}
              disabled={props.credentials.formInvalid}>Login
      </button>
      <p className={'mt-2'}>Don't have an account? <Link to={'/signUp'}>Sign Up!</Link></p>
    </div>
  </div>);
});
