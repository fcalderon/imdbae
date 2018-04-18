// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":

// adapted from Medium post on how to create chat client by StephanBV // https://medium.com/@Stephanbv/elixir-phoenix-build-a-simple-chat-room-7f20ee8e8f9c
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

    let channel = socket.channel("chats:1", {});
    let message = $('#message-input');
    console.log("socket", socket);
    let chatMessages = document.getElementById("chat-messages");

    message.focus();

    message.on('keypress', (event) => {
        if(event.keyCode == 13) {
            channel.push('message:new', { message: message.val() });
            message.val("");
        }
    });

    channel.on('message:new', (payload) => {
        let temp = document.createElement("div");
        temp.innerHTML = `<b>${payload.user}</b>:
                             ${payload.message}</br>`;
        
    chatMessages.appendChild(temp);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    });


    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp)} )
        .receive("error", resp => { console.log("Unable to join", resp) });

// Now that you are connected, you can join channels with a topic:
//let channel = socket.channel("topic:subtopic", {})
//channel.join()
//  .receive("ok", resp => { console.log("Joined successfully", resp) })
//  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
