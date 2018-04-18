import React from 'react';
import {Link} from "react-router-dom";

export const Nav = (props) => {
  return (<nav className="navbar navbar-expand-lg">
    <a className={'navbar-brand'}>IMDbae</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className={'navbar-nav mr-auto'}>
        <li className={'nav-item'}>
          <a className={'nav-link'} href="/">Home</a>
        </li>
        <li className={'nav-item'}>
          <Link className={'nav-link'} to="/movies">Movies</Link>
        </li>
      </ul>
      {
        props.currentUser
          ?
          (<div>
            <ul className={'navbar-nav mr-auto'}>
              <li className={'nav-item'}>
                <a className={'nav-link'}>
                  {props.currentUser.name}
                </a>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} onClick={() => props.handleLogOut()}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>)
          :
          <div>
            <ul className={'navbar-nav mr-auto'}>
              <li className={'nav-item'}>
                <a className={'nav-link'} href={'/login'}>
                  Login
                </a>
              </li>
            </ul>
          </div>

      }
    </div>
  </nav>)
};