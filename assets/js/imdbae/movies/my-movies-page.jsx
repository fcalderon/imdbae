import React from 'react';

export function MyMoviesPage(props) {
  return (<div>
    <h1>My Movies</h1>
    {renderLikedMovies(props)}
  </div>);
}

function renderLikedMovies(props) {
  return <div className={'row'}>
    <div className={'col'}>
      {
        props.likedMovies.map((userMovie) =>
          <div className={'row'} key={userMovie.id}>
            <div className={'col'}>
              <div className={'card'}>
                <div className={'card-body'}>
                  <h5 className={'card-title'}>{userMovie.title}</h5>
                  <button className={'btn btn-danger'} onClick={() => {
                    props.handleUnLikeMovieClicked(userMovie)
                  }}>Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </div>
}