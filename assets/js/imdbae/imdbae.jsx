import React from 'react';
import * as ReactDOM from 'react-dom';
import {Footer} from "./layout/footer";
import {Nav} from "./layout/nav";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login} from "./auth/login";
import {Movies} from "./movies/movies-page";
import {Registration} from "./auth/registration";
import {MyMoviesPage} from "./movies/my-movies-page";
import {connect, Provider} from 'react-redux';
import {Home} from "./layout/home";
import {MatchesPage} from "./matches/matches-page";
import {ProfilePage} from "./user/profile-page";
import {Chat} from "./chat/chat";

class IMDbaeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  userLoggedIn() {
    return !!this.props.auth.currentUser;
  }

  render() {
    return (<Router>
      <div>
        <Nav/>
        <div className={'container mt-4 pb-5 mb-5'}>
          <Route path={'/'} exact={true} render={() => <Home/>}/>
          <Route path={'/movies'} exact={true} component={Movies}/>
          <Route path={'/myMovies'} exact={true} component={MyMoviesPage}/>
          <Route path={'/matches'} exact={true} component={MatchesPage}/>
          <Route path={'/profile'} exact={true} component={ProfilePage}/>
          <Route path={'/chat'} exact={true}
                 render={(props) => {
                   if (!this.userLoggedIn()) {
                     props.history.push('/');
                     return <div/>
                   }
                   return <Chat/>
                 }}/>
          <Route path={'/login'} exact={true}
                 render={(props) => {
                   if (this.userLoggedIn()) {
                     props.history.push('/movies');
                   }
                   return <Login/>
                 }}/>
          <Route path={'/signUp'} exact={true} render={(props) => {
            if (this.userLoggedIn()) {
              props.history.push('/movies');
            }

            return <Registration/>
          }}/>
        </div>
        <Footer/>
      </div>
    </Router>);
  }
}

const IMDbae = connect(state => state)(IMDbaeComponent);

export const imdbae_init = (store) => {
  ReactDOM.render(<Provider store={store}><IMDbae/></Provider>, document.getElementById('imdbae'))
};
