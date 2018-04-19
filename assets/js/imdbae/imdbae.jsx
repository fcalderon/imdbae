import React from 'react';
import * as ReactDOM from 'react-dom';
import {Footer} from "./layout/footer";
import {Nav} from "./layout/nav";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login} from "./auth/login";
import {authService} from "./auth/service/auth.service";
import {Movies} from "./movies/movies-page";
import {tmdbApi} from "./movies/tmdb-api.service";
import {Registration} from "./auth/registration";
import {UserService} from "./user/service/user.service";
import {MovieHandles} from "./movies/movie-handles";
import {MyMoviesPage} from "./movies/my-movies-page";
import {UserMovieService} from "./movies/service/user-movies.service";
import {debounceEvent} from "./util/helpers";

const DEFAULT_STATE = {
  currentUser: undefined,
  credentials: {},
  registrationFormData: {},
  movies: []
};
export class IMDbae extends React.Component {

  constructor(){
    super();
    let currentUser = undefined;

    if (authService.isUserLoggedIn()) {
      currentUser = authService.getCachedCurrentUser();
    }

    this.state = Object.assign({}, DEFAULT_STATE, {currentUser: currentUser})
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

  handleLogin(props) {
    console.log('Log in clicked', this.state.credentials);
    authService.authenticate(this.state.credentials)
      .then(tokenWrapper => {
        console.log('User authenticated', tokenWrapper);
        this.setState(Object.assign({}, this.state, { currentUser: tokenWrapper.user }));
        props.history.push('/movies');
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

  getUsermovies() {
    if (!this.state.likedMovies && !!this.state.currentUser) {
      UserMovieService
        .getAll(this.state.currentUser.id)
        .then(res => this.setState(Object.assign({}, this.state, {likedMovies: res.data})))
        .catch(err => console.error('Error getting user movies', err));
    }
  }

  handleOnSearchQueryChanged(query) {
    if (query === undefined || query.length === 0) {
      this.getMovies();
      return;
    }
    tmdbApi.search(query)
      .then(movies => {
        console.log('Got movies', movies);
        this.setState(Object.assign({}, this.state, {movies: movies.results}))
      })
      .catch(err => console.error('error getting movies', err))
  }

  handleRegister(props) {
    UserService.create(this.state.registrationFormData)
      .then(createdUser => {
        this.setState(Object.assign({}, this.state,
          {credentials: {email: createdUser.email, password: this.state.registrationFormData.password}}));
        this.handleLogin(props);
      })
      .catch(err => {
        console.log('Error registering user', err);
        // TODO handle errors, feedback to user
      })
  }

  handleOnRegisterFormChanged(formField) {
    console.log('Hanlde on change', formField);
    switch (formField.fieldName) {
      case 'email':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.registrationFormData,
          {email: formField.fieldValue})));
        console.log(this.state);
        break;
      case 'name':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.registrationFormData,
          {name: formField.fieldValue})));
        console.log(this.state);
        break;
      case 'password':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.registrationFormData,
          {password: formField.fieldValue})));
        break;
      case 'password-confirmation':
        this.setState(Object.assign({}, this.state, Object.assign(this.state.registrationFormData,
          {password_confirmation: formField.fieldValue})));
        break;
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
            this.getUsermovies();
            return <Movies movies={this.state.movies || []}
                           likedMovies={this.state.likedMovies || []}
                           hideLike={!this.state.currentUser}
                           handleOnSearchQueryChanged={debounceEvent((q) => {
                             this.handleOnSearchQueryChanged(q)
                           }, 500)}
                           handleLikeClicked={(movie) => MovieHandles.handleLikeClicked(this.state.currentUser.id,
                             movie, this.state, this)}/>
          }}/>
          <Route path={'/myMovies'} exact={true} render={(props) => {
            this.getUsermovies();
            return <MyMoviesPage likedMovies={this.state.likedMovies || []}
                                 handleUnLikeMovieClicked={(movie) => MovieHandles.handleUnLikeMovieClicked(movie.id, this.state, this)}/>
          }}/>
          <Route path={'/login'} exact={true}
                 render={(props) =>
                   <Login
                     onChange={
                       (formField) => {
                         this.handleOnChange(formField)
                       }
                     }
                     handleLogin={() => this.handleLogin()}/>}/>
          <Route path={'/signUp'} exact={true} render={(props) => {
            return <Registration
              onChange={(formField) => this.handleOnRegisterFormChanged(formField)}
              onSubmit={() => this.handleRegister(props)}/>
          }}/>
        </div>
        <Footer/>
      </div>
    </Router>);
  }
}

export const imdbae_init = () => {
  ReactDOM.render(<IMDbae/>, document.getElementById('imdbae'))
};
