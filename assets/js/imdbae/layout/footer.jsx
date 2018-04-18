import React from 'react';

export function Footer() {
  return (<footer>
    <div className="row">
      <div className="col-2">
        <img src="/images/tmdblogo.png" alt="TMDb logo" style={{width:"50px", height: "50px"}}/>
      </div>
      <div className="col">
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb</p>
      </div>
    </div>
  </footer>)
}