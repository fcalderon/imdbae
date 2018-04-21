// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":

// adapted from Medium post on how to create chat client by StephanBV // https://medium.com/@Stephanbv/elixir-phoenix-build-a-simple-chat-room-7f20ee8e8f9c
import {Socket} from "phoenix"

window.userToken = localStorage.getItem("__AUTH_TOKEN");

let socket = new Socket("/socket", {params: {token: localStorage.getItem("__AUTH_TOKEN")}})

socket.connect()

let channel = socket.channel("chats:1", {});

channel.join()
	.receive("ok", resp => { console.log("joined", resp) })
	.receive("error", resp => { console.log("failed", resp) });

export default socket
