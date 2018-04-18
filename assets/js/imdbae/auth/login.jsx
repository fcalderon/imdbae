import React from 'react';


export const Login = (props) => {
  return (<div className={'card'}>
    <div className={'card-body'}>
      <h5>Login</h5>
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
      <button className={'btn btn-primary'} onClick={() => {props.handleLogin()}}>Login</button>
    </div>
  </div>);
};