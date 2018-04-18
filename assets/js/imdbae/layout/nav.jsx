import React from 'react';

export const Nav = (props) => {
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className={'navbar-brand'}>IMDbae</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        props.currentUser
          ?
          <ul className={'navbar-nav mr-auto'}>
            <li className={'nav-item'}>
              <span className={'navbar-text'}>
                Logged in as: <a>{props.currentUser.name}</a>
              </span>
            </li>
            <li className={'nav-item'}>
              <a onClick={ () => props.handleLogOut() }>
                Log Out
              </a>
            </li>
          </ul>
          :
          <ul className={'navbar-nav mr-auto'}>
            <li className={'nav-item'}>
         <span className={'navbar-text'}>
            Not Logged In
          </span>
            </li>
          </ul>

      }
    </div>
  </nav>)
};