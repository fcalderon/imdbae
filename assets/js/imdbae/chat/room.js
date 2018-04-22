//Attrib: Let's build a slack clone from Medium

import {SocketService} from "./socket.service";
import {toAction} from "../util/helpers";

const Actions = {
  CreateMessage: '[Room] - create message',
  CreateMessageSuccess: '[Room] - create message success',
  ReceiveMessageSuccess: '[Room] - receive message success',
  CreateMessageError: '[Room] - create message error',
  JoinChannel: '[Room] - join channel',
  JoinChannelSuccess: '[Room] - join  channel SUCCESS',
  JoinChannelError: '[Room] - join  channel ERROR',
};

const initialState = {
  socket: undefined,
	channel: null,
  joiningChannel: false,
  currentRoom: {},
  currentChannelName: undefined,
	messages: [],
  loadingOlderMessages: false,
};

export const RoomDataService = store => next => action => {
  next(action);
  const state = store.getState().room;
  let socket = state.socket;

  switch (action.type) {
    case Actions.JoinChannel:
      console.log('Joining channel', action);
      let payload = {
        channelName: action.payload.name
      };

      if (!socket) {
        socket = SocketService.getSocket(store.getState().auth.token);
        payload.socket = socket;
      }

      payload.channel = socket.channel(action.payload.name, {});
      console.log('Got channel');
      payload.channel.join()
      // .receive('ok', resp => next(toAction(Actions.JoinChannelSuccess, payload)))
        .receive('ok',
          resp => next(toAction(Actions.JoinChannelSuccess,
            {channel: payload.channel, socket, resp, channelName: action.payload.name})))
        .receive('error', resp => next(toAction(Actions.JoinChannelError, {...payload, resp: resp})));
      // Handles when messages are received
      payload.channel.on('message:new', res => {
        console.log('Got message', res);
        if (res.user !== store.getState().auth.currentUser.email) {
          next(toAction(Actions.ReceiveMessageSuccess, {message: res.message}))
        }
      });
      break;
    case Actions.CreateMessage:
      if (state.channel) {
        state.channel.push('message:new', {message: action.payload})
          .receive('ok', resp => {
            return next(toAction(Actions.CreateMessageSuccess, {message: action.payload, resp: resp}))

          })
          .receive('error', resp => {
            return next(toAction(Actions.CreateMessageError, {message: action.payload, resp: resp}))
          });
      } else {
        return next(toAction(Actions.CreateMessageError, {message: 'Not connected to channel'}));
      }
      break;
  }
};

export const RoomActionCreators = {
  joinChannel: (channelName, channelOptions) => toAction(Actions.JoinChannel, {
    name: channelName,
    options: channelOptions
  }),
  sendMessage: (message) => toAction(Actions.CreateMessage, message)
};

export default function (state = initialState, action) {
	switch(action.type) {
    case Actions.JoinChannel:
      return {
        ...state,
        joiningChannel: true
      };
    case Actions.JoinChannelSuccess:
      return {
        ...state,
        socket: action.payload.socket || state.socket,
        channel: action.payload.channel,
        currentChannelName: action.payload.channelName,
        messages: [],
        joiningChannel: false
      };
    case Actions.JoinChannelError:
      return {
        ...state,
        joiningChannel: false
      };
		case 'ROOM_CONNECTED_TO_CHANNEL':
			return {
				...state,
				channel: action.channel,
				currentRoom: action.response.room,
				messages: action.response.messages.reverse(),
				pagination: action.response.pagination,
			};
    case Actions.CreateMessageError:
      console.error(action.type, action);
      return state;
    case Actions.ReceiveMessageSuccess:
    case Actions.CreateMessageSuccess:
			return {
				...state,
				messages: [
          ...state.messages,
          action.payload.message,
				],
			};
		case 'FETCH_MESSAGES_REQUEST':
			return {
				...state, 
				loadingOlderMessages: true, 
			};
		case 'FETCH_MESSAGES_SUCCESS':
			return {
				...state, 
				messages: [
					...action.response.data.reverse(),
					...state.messages,
				],
				pagination: action.response.pagination,
				loadingOlderMessages: false,
			};
		case 'FETCH_MESSAGES_FAILURE':
			return {
				...state,
				loadingOlderMessages: false,
			};
		case 'UPDATE_ROOM_SUCCESS':
			return {
				...state,
				currentRoom: action.response.data,
			};
    case 'ROOT_RESET':
      return initialState;
		default:
			return state;
	}
}
