import React from 'react';
import * as ReactDOM from 'react-dom';
import {Footer} from "./layout/footer";
import {Nav} from "./layout/nav";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {Login} from "./auth/login";
import {authService} from "./auth/service/auth.service";

export class IMDbae extends React.Component {
  constructor(){
    super();
    let currentUser = undefined;
    if (authService.isUserLoggedIn()) {
      currentUser = authService.getCachedCurrentUser();
    }
    this.state = {
      currentUser: currentUser,
      credentials: {}
    };
  }

  handleOnChange(formField) {
    console.log('Hanlde on change', formField);
    switch (formField.fieldName) {
      case 'email':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.credentials,
          { email: formField.fieldValue })));
        console.log(this.state);
        break;
      case 'password':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.credentials,
          { password: formField.fieldValue })));
        break;
    }
  }

  handleLogOut() {
    console.log('User clicked logged out');
    authService.logOut();
    this.setState(Object.assign({}, this.state, { currentUser: undefined }));
  }

  handleLogin() {
    console.log('Log in clicked', this.state.credentials);
    authService.authenticate(this.state.credentials)
      .then(tokenWrapper => {
        console.log('User authenticated', tokenWrapper);
        this.setState(Object.assign({}, this.state, { currentUser: tokenWrapper.user }));
      })
      .catch(error => {
        console.error('There was an error authenticating user', error);
      });
  }
  render() {
    return(<div>
      <Nav currentUser={this.state.currentUser} handleLogOut={ () => { this.handleLogOut() }}/>
      <div className={'container mt-4'}>
        {
          this.state.currentUser
            ?
            <p>Logged in</p>

            :
            <Login onChange={ (formField) => { this.handleOnChange(formField)}}
                   handleLogin={ () => this.handleLogin() }/>

        }
      </div>
      <Footer/>
    </div>);
  }
}

export const imdbae_init = () => {
  ReactDOM.render(<IMDbae/>, document.getElementById('imdbae'))
};
