import React from 'react';
import * as ReactDOM from 'react-dom';
import {Footer} from "./layout/footer";
import {Nav} from "./layout/nav";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login} from "./auth/login";
import {authService} from "./auth/service/auth.service";
import {Movies} from "./movies/movies-page";
import {tmdbApi} from "./movies/tmdb-api.service";

export class IMDbae extends React.Component {
  constructor(){
    super();
    let currentUser = undefined;
    if (authService.isUserLoggedIn()) {
      currentUser = authService.getCachedCurrentUser();
    }
    this.state = {
      currentUser: currentUser,
      credentials: {},
      movies: []
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

  getMovies() {
    if (this.state.movies.length === 0) {
      tmdbApi.discover()
        .then(movies => {
          console.log('Got movies', movies);
          this.setState(Object.assign({}, this.state, {movies: movies.results}))
        })
        .catch(err => console.error('error getting movies', err))
    }
  }

  render() {
    return (<Router>
      <div>
        <Nav currentUser={this.state.currentUser} handleLogOut={() => {
          this.handleLogOut()
        }}/>
        <div className={'container mt-4'}>
          <Route path={'/'} exact={true} render={(props) => <h1>You are home!</h1>}/>
          <Route path={'/movies'} exact={true} render={(props) => {
            this.getMovies();
            return <Movies movies={this.state.movies || []}/>
          }}/>
          <Route path={'/login'} exact={true}
                 render={(props) => <Login onChange={(formField) => {
                   this.handleOnChange(formField)
                 }}
                                           handleLogin={() => this.handleLogin()}/>}/>
        </div>
        <Footer/>
      </div>
    </Router>);
  }
}

export const imdbae_init = () => {
  ReactDOM.render(<IMDbae/>, document.getElementById('imdbae'))
};
