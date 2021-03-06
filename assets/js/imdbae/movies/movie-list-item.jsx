import React from 'react';

export const MovieListItem = (props) => {
  return <div key={props.movie.id} className='card mb-1'>
    <div className="card-body">
      <div className={'row'}>
        <div className={'col-sm-3'}>
          <img src={`https://image.tmdb.org/t/p/w185/${props.movie.poster_path}`}/>
        </div>
        <div className={'col-sm-9'}>
          <h3>{props.movie.title}</h3>
          <p>{props.movie.overview}</p>
        </div>
      </div>

    </div>
    <div className={'card-footer'}>
      {
        props.isLiked
          ?
          <span>You liked this movie!</span>
          :
          <button className={'btn btn-success'} onClick={() => {
            props.handleLikeClicked()
          }} hidden={props.hideLike}>Like!</button>
      }
    </div>
  </div>
};