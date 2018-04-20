import React from 'react';
import {Link} from "react-router-dom";

export function Home() {
  return <div>
    <h1>Welcome to IMDbae</h1>
    <p>Find movies you like and be match with "equally minded" people!</p>
    <Link className={'btn btn-success'} to={'/movies'}>Start Finding Movies!</Link>
  </div>
}