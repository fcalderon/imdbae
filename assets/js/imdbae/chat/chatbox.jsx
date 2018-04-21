import React from 'react';
import socket from '../../socket';

function submitMsg(ev) {
    console.log("SUBMITTED");
    ev.preventDefault();
}

export const Chatbox = (props) => {
    console.log(props);
    return (<div className={'card chat-room'}>
             <div className={'card-header'}>
               Hello //pass user
             </div>
             <div className={'card-body card-messages'}>
               <div>msg</div>
             </div>
             <form onSubmit={submitMsg}>
               <input type="text" id="message-input" className={'form-control'} 
                 placeholde="Start chatting..."
                 />
             </form>
           </div>);
};
