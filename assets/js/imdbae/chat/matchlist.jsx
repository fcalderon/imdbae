import React from 'react';
import {connect} from 'react-redux';
import socket from '../../socket';
import _ from 'lodash';


const mapStateToProps = (state) => {
    return {
		matches: state.matches.matches.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //???
    }
}


class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

	processMatches(matches) {
		let proc =  _.chain(matches)
		.groupBy(m => m.second_user_id)
		.map((value, key) => ({first_user: value[0].first_user, second_user: value[0].second_user}))
		.value();
		return proc;
	}

    render() {
        return (<div className={'card chat-room'}>
             <div className={'card-header'}>
               YourMatches  
             </div>
             <div className={'card-body card-users'} id={'your-matches'}>
				{this.processMatches(this.props.matches).map((match, index) => <MatchButton props={match} key={match.second_user_id}/>)}
			</div>
           </div>);
    }
}

class MatchButton extends React.Component {
	constructor(props) {
		super(props);
		this.second_user = props.props.second_user;
		this.combined_id = this.combinedIds(props.props.first_user, props.props.second_user);
        this.changeChannel = this.changeChannel.bind(this);
	}

	combinedIds(first_user, second_user) {
		let id1 = first_user.id;
		let id2 = second_user.id;
		let arr = [id1, id2];
		arr.sort();
		let new_id = arr.join('');
		return new_id;
	}

    changeChannel() {
        let channel = socket.channel("chats:" + this.combined_id, {});
        channel.join()
            .receive("ok", resp => { console.log("joined channel", resp) })
            .receive("error", resp => { console.log("error joining channel", resp) });
    }

	render () {
		return (<div>
                <button className={'btn btn-block'} style={{margin: '3px'}} 
                        onClick={this.changeChannel}>
                    {this.second_user.name}
                </button></div>)
	}
}

export const Matchlist = connect(mapStateToProps, mapDispatchToProps)(Matches);
