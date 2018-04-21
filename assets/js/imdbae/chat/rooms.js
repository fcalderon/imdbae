//from Let's build a slack clone on Medium

import api from './api'

export function fetchRooms() {
	return dispatch => api.fetch('rooms')
	.then((response) => {
		dispatch({ type: 'FETCH_ROOMS_SUCCESS', response });
	});
}

export function fetchUserRooms(user_id) {
	return dispatch => api.fetch('/users/${user_id}/rooms')
	.then((response) => {
		dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', response });
	});
}

export function createRoom(data, router) {
	return dispatch => api.post('/rooms', data)
	.then((response) => {
		dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
		router.transitionTo('/r/${response.data.id}');
	});
}

export function joinRoom(room_id, router) {
	return dispatch => api.post('/rooms/${room_id}/join')
	.then((response) => {
		dispatch({ type: 'ROOM_JOINED', response });
		router.transitionTo('/r/${response.data.id}');
	});
}

const initialState = {
	all: [],
	currentUserRooms: [],
};

export default function (state = initialState, action) {
	switch(action.type) {
		case 'FETCH_ROOMS_SUCCESS':
			return {
				...state,
				all: action.response.data,
			};
		case 'FETCH_USER_ROOMS_SUCCESS':
			return {
				...state,
				currentUserRooms: action.response.data,
			};
		case 'CREATE_ROOM_SUCCESS':
			return {
				...state, 
				all: [
					action.response.data,
					...state.all,
				],
				currentUserRooms: [
					...state.currentUserRooms,
					action.response.data,
				],
			};
		case 'ROOM_JOINED':
			return {
				...state, 
				currentUserRooms: [
					...state.currentUserRooms,
					action.response.data,
				],
			};
		default:
			return state;
	}
}

