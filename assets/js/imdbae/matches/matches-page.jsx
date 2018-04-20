import React from 'react';
import {connect} from "react-redux";
import {MatchListItem} from "./match-list-item";
import {MatchesActionCreators} from "./state-config";
import _ from 'lodash';

class MatchesPageComponent extends React.Component {
  componentWillMount() {
    if (!this.props.currentUser) {
      this.props.history.push('/login');
    } else {
      this.props.loadMatches(this.props.currentUser)
    }
  }

  processMatches(matches) {
    return _.chain(matches)
      .groupBy(m => m.second_user_id)
      .map((value, key) => ({second_user_id: key, second_user: value[0].second_user, movies: value}))
      .value();
  }

  render() {
    return (<div>
      <h1>Matches</h1>
      {this.processMatches(this.props.matches).map(match => <MatchListItem match={match} key={match.second_user_id}/>)}
    </div>);
  }
}

const mapState = state => {
  return {
    matches: state.matches.matches.data,
    currentUser: state.auth.currentUser
  }
};
const mapDispatch = dispatch => {
  return {
    loadMatches: (user) => {
      dispatch(MatchesActionCreators.getAll(user.id));
    }
  }
};

export const MatchesPage = connect(mapState, mapDispatch)(MatchesPageComponent);