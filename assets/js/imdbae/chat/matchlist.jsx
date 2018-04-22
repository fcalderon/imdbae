import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {RoomActionCreators} from "./room";

function processMatches(matches) {
  return _.chain(matches)
    .groupBy(m => m.second_user_id)
    .map((value) => ({first_user: value[0].first_user, second_user: value[0].second_user}))
    .value();
}

function combinedIds(first_user, second_user) {
  let id1 = first_user.id;
  let id2 = second_user.id;
  let arr = [id1, id2];
  arr.sort();
  return arr.join('');
}

const Matches = (props) => {
  return (<div className={'card chat-room'}>
    <div className={'card-header'}>
      YourMatches
    </div>
    <div className={'card-body card-users'} id={'your-matches'}>
      {
        processMatches(props.matches)
          .map((match, index) => <MatchButton match={match} key={index}
                                              onClick={() => props.joinChannel(`chats:${combinedIds(match.first_user, match.second_user)}`)}/>)}
    </div>
  </div>);
};

const MatchButton = (props) => {
  return (<div>
    <button className={'btn btn-block'} style={{margin: '3px'}}
            onClick={() => props.onClick()}>
      {props.match.second_user.name}
    </button>
  </div>)
};

const mapStateToProps = (state) => {
  return {
    matches: state.matches.matches.data,
    currentUser: state.auth.currentUser,
    token: state.auth.token,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinChannel: (channelName, channelOptions) => dispatch(RoomActionCreators.joinChannel(channelName, channelOptions))
  }
};

export const Matchlist = connect(mapStateToProps, mapDispatchToProps)(Matches);
