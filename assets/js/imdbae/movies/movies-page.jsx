import React from 'react';
import {MovieListItem} from "./movie-list-item";
import {MoviesActionCreator} from "./state-config";
import {connect} from "react-redux";
import {UserMoviesActionCreator} from "./user-movies-state-config";
import {debounceEvent} from "../util/helpers";
import {Spinner} from "../util/spinner";

function isLiked(movieId, userMovies) {
  return userMovies.some((userMovie) => {
    return userMovie.movie_id === movieId;
  })
}

class MoviesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchInputChanged = debounceEvent((q) => {
      this.props.updateQuery(q);
    }, 500);
  }

  componentWillMount() {
    this.props.loadMovies(this.props.currentUser);
  }

  render() {
    return (<div>
      <h1>Movies</h1>
      {
        this.props.loading
          ?
          <Spinner/>
          :
          <div>
            <div className={'row'}>
              <div className={'col'}>
                <div className={'form-group'}>
                  <input className={'form-control'} placeholder={'Search for a movie...'}
                         onChange={$ev => this.onSearchInputChanged($ev.target.value)}/>
                </div>
              </div>
            </div>
            {this.props.movies.map(movie => <MovieListItem key={movie.id}
                                                           hideLike={!this.props.currentUser}
                                                           movie={movie}
                                                           handleLikeClicked={() => props.likeMovie(this.props.currentUser.id, movie)}
                                                           isLiked={!!this.props.currentUser && isLiked(movie.id, this.props.userMovies)}/>)}
          </div>
      }
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies.results,
    currentUser: state.auth.currentUser,
    userMovies: state.userMovies.userMovies.data,
    loading: state.movies.movies.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadMovies: (user) => {
      dispatch(MoviesActionCreator.getAll());
      if (user) {
        dispatch(UserMoviesActionCreator.getAll(user.id));
      }
    },
    likeMovie: (userId, movie) => dispatch(UserMoviesActionCreator.addMovie(userId, movie)),
    updateQuery: query => {
      dispatch(MoviesActionCreator.updateQuery(query));
      dispatch(MoviesActionCreator.getAll(query));
    }
  }
};

export const Movies = connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);