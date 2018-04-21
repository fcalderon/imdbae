import React from 'react';
import socket from '../../socket';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        chat: state.room,
		user: state.auth.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitMsg: (ev, message, user) => {
            message = user + ": " + message;
            ev.preventDefault();
            dispatch({type: 'MESSAGE_CREATED', payload: message})
        }
    }
};



class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (<div className={'card chat-room'}>
             <div className={'card-header'}>
               Hello {this.props.user.name}
             </div>
             <div className={'card-body card-messages'}>
               <div>{this.props.chat.messages.map((message, index) => <p key={index}>
                       {message}</p>)}</div>
             </div>
             <form onSubmit={(ev) => {this.props.submitMsg(ev, this.state.value, this.props.user.name); this.setState({value: ""})}}>
               <input type="text" id="message-input" className={'form-control'} 
                 placeholder="Start chatting..."
                 onChange={this.handleChange}
                 value={this.state.value}
                 />
             </form>
           </div>);
    }
}

export const Chatbox = connect(mapStateToProps, mapDispatchToProps)(Message);
