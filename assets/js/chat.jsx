//import React from 'react';
import socket from './socket';

export default function start_chat(chat) {
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
}

