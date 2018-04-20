import React from 'react';
import {connect} from "react-redux";
import {UserMoviesActionTypes} from "./user-movies-state-config";

class MyMoviesPageComponent extends React.Component {
  componentWillMount() {
    if (!this.props.currentUser) {
      this.props.history.push('/login');
    } else {
      this.props.loadUserMovies(this.props.currentUser)
    }
  }

  render() {
    return <div className={'row'}>
      <div className={'col'}>
        <div className={'row'}>
          <div className={'col'}>
            {
              this.props.error
                ?
                <div className={'alert alert-danger alert-dismissible fade show'} role="alert">
                  Error loading movies
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                :
                <div className={'alert alert-success alert-dismissible fade show'} role="alert">
                  Movies loaded successfully
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            }
          </div>
        </div>
        <div className={'row'}>
          <div className={'col'}>
            {
              this.props.userMovies.map((userMovie) =>
                <div className={'row'} key={userMovie.id}>
                  <div className={'col'}>
                    <div className={'card'}>
                      <div className={'card-body'}>
                        <h5 className={'card-title'}>{userMovie.title}</h5>
                        <button className={'btn btn-danger'} onClick={() => {
                          this.props.remove(userMovie);
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
      </div>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserMovies: (currentUser) => {
      dispatch({type: UserMoviesActionTypes.GetAll, payload: currentUser.id})
    },
    remove: userMovie => {
      dispatch({type: UserMoviesActionTypes.Remove, payload: userMovie})
    }
  }
};

const mapStateToProps = state => {
  return {
    userMovies: state.userMovies.userMovies.data,
    error: state.userMovies.userMovies.error,
    currentUser: state.auth.currentUser
  }
};

export const MyMoviesPage = connect(mapStateToProps, mapDispatchToProps)(MyMoviesPageComponent);