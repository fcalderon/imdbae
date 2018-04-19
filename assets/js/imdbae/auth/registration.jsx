import React from 'react';

export const Login = (props) => {
	return (<div className={'card'}>
		<div className={'card-body'}>
			<h5>Register</h5>
			<form>
				<div className={'form-group'}>
					<label htmlFor={'email-field'}>Email</label>
					<input id="email-field" className={'form-control'} type="email"
						onChange={($ev) => { props.onChange({ fieldName: 'email', fieldValue: $ev.target.value})}}/>
				</div>
				<div className={'form-group'}>
					<label htmlFor={'name-field'}>Name</label>
					<input id="name-field" className={'form-control'} type="text"
						onChange={($ev) => { props.onChange({ fieldName: 'name', fieldValue: $ev.target.value})}}/>
				</div>
				<div className={'form-group'}>
					<label htmlFor={'password-field'}>Password</label>
					<input id="password-field" className={'form-control'} type="password"
						onChange={($ev) => { props.onChange({ fieldName: 'password', fieldValue: $ev.target.value}) }}/>
				</div>
				<div className={'form-group'}>
					<label htmlFor={'password-confirmation-field'}>Password Confirmation</label>
					<label id="password-confirmation-field" className={'form-control'} type="password"
						onChange={($ev) => { props.onChange({ fieldName: 'password-confirmation', fieldValue: $ev.target.value}) }}/>
				</div>
		</form>
		<button className={'btn btn-primary'} onClick={() => {props.handleRegistration()}}>Register</button>
		</div>
		</div>);
};
		
