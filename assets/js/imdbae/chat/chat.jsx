import React from 'react';
import socket from '../../socket';
import {Matchlist} from './matchlist';
import {Chatbox} from './chatbox';

export const Chat = (props) => {
    let channel = socket.channel("chats:1", {});
    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp)} )
        .receive("error", resp => { console.log("Unable to join", resp) });

    return <div className={'row'}>
             <div className={'col-md-3'}>
               {renderMatchlist(props.currentUser)}
             </div>
             <div className={'col-md-9'}>
               {renderChatbox(props.currentUser)}
             </div>
           </div>
};

function renderMatchlist(user) {
    return <Matchlist key={user.id} user={user}></Matchlist>
}

function renderChatbox(user) {
    return <Chatbox key={user.id} user={user}></Chatbox>
}

/**
    let channel = socket.channel("chats:1", {});
    let message = $('#message-input');
    let name = "name"; 
    let chatMessages = document.getElementById("chat-messages");

    message.focus();

    message.on('keypress', (event) => {
        if(event.keyCode == 13) {
            channel.push('message:new', { message: message.val(),
                                          user: name });
            message.val("");
        }
    });

    channel.on('message:new', (payload) => {
        let temp = document.createElement("div");
        temp.innerHTML = `<b>${payload.user}</b>:
                             ${payload.message}</br>`;
        
    chatMessages.appendChild(temp);
    chatMessages.scrollTop = chattMessages.scrollHeight;
    });


    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp)} )
        .receive("error", resp => { console.log("Unable to join", resp) });
        **/
