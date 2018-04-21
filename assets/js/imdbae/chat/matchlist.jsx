import React from 'react';
import {connect} from 'react-redux';
import socket from '../../socket';

const mapStateToProps = (state) => {
    return {
        //IDK
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

    render() {
        return (<div className={'card chat-room'}>
             <div className={'card-header'}>
               YourMatches
             </div>
             <div className={'card-body card-users'} id={'your-matches'}>
             </div>
           </div>);
    }
}

export const Matchlist = connect(mapStateToProps, mapDispatchToProps)(Matches);
