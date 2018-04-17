//import React from 'react';
import socket from './socket';

export default function start_chat(chat) {
    let channel = socket.channel("chat/1", {});
    
    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp)} )
        .receive("error", resp => { console.log("Unable to join", resp) });
}

