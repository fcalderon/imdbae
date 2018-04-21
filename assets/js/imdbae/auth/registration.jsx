import React from 'react';
import {connect} from "react-redux";
import {AuthActionCreator} from "./state-config";
import {Link} from "react-router-dom";
import {UncontrolledAlert} from "reactstrap";

const stateToProps = state => {
  return {
    formData: state.auth.signUpFormData,
    error: state.auth.signUpFormData.error
  }
};
const dispatchToProps = dispatch => {
  return {
    onChange: fieldObject => dispatch(AuthActionCreator.updateSignUpForm(fieldObject)),
    handleRegister: (user, history) => dispatch(AuthActionCreator.register(user, history))
  }
};


export const Registration = connect(stateToProps, dispatchToProps)((props) => {
  return (<div className={'card'}>
    <div className={'card-body'}>
      <h5>Register</h5>
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
          <input id="email-field" className={'form-control'} type="email" autoComplete={'email'}
                 value={props.formData.email}
                 onChange={($ev) => {
                   props.onChange({fieldName: 'email', fieldValue: $ev.target.value})
                 }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'name-field'}>Name</label>
          <input id="name-field" className={'form-control'} type="text" autoComplete={'name'}
                 value={props.formData.name}
                 onChange={($ev) => {
                   props.onChange({fieldName: 'name', fieldValue: $ev.target.value})
                 }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'password-field'}>Password</label>
          <input id="password-field" className={'form-control'} type="password" autoComplete={'new-password'}
                 value={props.formData.password}
                 onChange={($ev) => {
                   props.onChange({fieldName: 'password', fieldValue: $ev.target.value})
                 }}/>
        </div>
        <div className={'form-group'}>
          <label htmlFor={'password-confirmation-field'}>Password Confirmation</label>
          <input id="password-confirmation-field" className={'form-control'} type="password"
                 autoComplete={'new-password'}
                 value={props.formData.password_confirmation}
                 onChange={($ev) => {
                   props.onChange({fieldName: 'password_confirmation', fieldValue: $ev.target.value})
                 }}/>
        </div>
      </form>
      <button className={'btn btn-primary'} onClick={() => props.handleRegister(props.formData, props.history)}
              disabled={props.formData.formInvalid}>
        Register
      </button>
      <p className={'mt-2'}>Already have an account? <Link to={'/login'}>Login!</Link></p>
    </div>
  </div>);
});
		
