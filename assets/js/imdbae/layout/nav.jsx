import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {AuthActionCreator} from "../auth/state-config";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogOut: (history) => dispatch(AuthActionCreator.logout(history))
  }
};

export const Nav = connect(mapStateToProps, mapDispatchToProps)(withRouter((props) => {
  return (<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FFC0CB"}}>
    <a className={'navbar-brand'} href="/"><img src="/images/imdbae.png" alt="IMDbae"/></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"/>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className={'navbar-nav mr-auto'}>
        <li className={'nav-item'}>
          <Link className={'nav-link'} to="/chat">Chat</Link>
        </li>
        <li className={'nav-item'}>
          <Link className={'nav-link'} to="/movies">Movies</Link>
        </li>
        {
          props.currentUser
            ?
            <li className={'nav-item'}>
              <Link className={'nav-link'} to="/matches">Matches</Link>
            </li>
            :
            <div/>
        }
      </ul>
      {
        props.currentUser
          ?
          (<div>
            <ul className={'navbar-nav mr-auto'}>
              <li className={'nav-item'}>
                <Link className={'nav-link'} to={'/myMovies'}>
                  My Movies
                </Link>
              </li>
              <li className={'nav-item'}>
                <Link className={'nav-link'} to={'/profile'}>
                  {props.currentUser.name}
                </Link>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} onClick={() => props.handleLogOut(props.history)}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>)
          :
          <div>
            <ul className={'navbar-nav mr-auto'}>
              <li className={'nav-item'}>
                <Link className={'nav-link'} to={'/login'}>
                  Login
                </Link>
              </li>
              <li className={'nav-item'}>
                <Link className={'nav-link'} to={'/signUp'}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
      }
    </div>
  </nav>)
}));
