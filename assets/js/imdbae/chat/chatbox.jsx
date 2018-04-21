import React from 'react';
import socket from '../../socket';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    console.log("STATE", state.room);
    return {
        chat: state.room
    }
};

const mapDispatchToProps = (dispatch) => {
    console.log("DISPATHC");
    return {
        submitMsg: (ev, message) => {
            console.log("DISMESSAGE", message);
            message = message + "\n";
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
        console.log("VAL", this.state.value);
        this.setState({value: event.target.value});
    }

    render() {
        console.log("msg", this.props.chat.messages);
        return (<div className={'card chat-room'}>
             <div className={'card-header'}>
               Hello //pass user
             </div>
             <div className={'card-body card-messages'}>
               <p>{this.props.chat.messages}</p>
             </div>
             <form onSubmit={(ev) => this.props.submitMsg(ev, this.state.value)}>
               <input type="text" id="message-input" className={'form-control'} 
                 placeholder="Start chatting..."
                 onChange={this.handleChange}
                 />
             </form>
           </div>);
    }
}

export const Chatbox = connect(mapStateToProps, mapDispatchToProps)(Message);
