// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":

import {Socket} from "phoenix"

window.userToken = localStorage.getItem("__AUTH_TOKEN");
let socket = new Socket("/socket", {props: {token: window.userToken}})

socket.connect()

export default socket
