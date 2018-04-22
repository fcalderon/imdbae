import React from 'react';
import {Matchlist} from './matchlist';
import {Chatbox} from './chatbox';
import {MatchesActionCreators} from "../matches/state-config";
import {connect} from "react-redux";


export class ChatComponent extends React.Component {
  componentWillMount() {
    this.props.loadMatches(this.props.currentUser)
  }

  render() {
    return (<div className={'chat container'}>
      <div className={'row'}>
        <div className={'col-md-3'}>
          <Matchlist props={this.props}/>
        </div>
        <div className={'col-md-9'}>
          <Chatbox props={this.props}/>
        </div>
      </div>
    </div>);
  }
}

const mapDispatch = dispatch => {
  return {
    loadMatches: (user) => {
      dispatch(MatchesActionCreators.getAll(user.id));
    }
  }
};

export const Chat = connect(state => ({currentUser: state.auth.currentUser}), mapDispatch)(ChatComponent);
