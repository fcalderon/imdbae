// noinspection ES6CheckImport
import {Socket} from "phoenix"

let socket = undefined;

function getSocket(token) {
  if (!socket) {
    socket = new Socket("/socket", {params: {token}});
    socket.connect();
  }
  return socket;
}

export const SocketService = {
  getSocket
};
