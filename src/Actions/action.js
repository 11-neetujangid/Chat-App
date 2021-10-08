export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';
export const SET_AUTH = 'SET_AUTH';
export const SET_CONTENT = 'SET_CONTENT';
export const READ = 'READ';
export const CHATS = 'CHATS';
export const SET_VALUES = 'SET_VALUES';

export const setData = (payload) => ({ type: SET_DATA, payload: payload });
export const setError = (payload) => ({ type: SET_ERROR, payload: payload });
export const setAuth = (payload) => ({ type: SET_AUTH, payload: payload });
export const setContent = (payload) => ({ type: SET_CONTENT, payload: payload });
export const read = (payload) => ({ type: READ, payload: payload });
export const Chats = (payload) => ({ type: CHATS, payload: payload });
export const setValues = (payload) => ({ type: SET_VALUES, payload: payload });


