import { CHATS, READ, SET_AUTH, SET_CONTENT, SET_DATA, SET_ERROR, SET_VALUES } from "../Actions/action";
import { auth } from "../services/firebase";

const initialState = {
    data: {
        email: '',
        password: '',
        error: null
    },
    authData: {
        authenticated: false,
        loading: true
    },
    content: {
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false
    },
    contentData: '',
    chats: [],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload,
            }
        case SET_ERROR:
            state.data.error = action.payload
            return {
                ...state,
                data: state.data.error
            }
        case SET_AUTH:
            console.log(action.payload)
            return {
                ...state,
                authData: action.payload
            }
        case SET_CONTENT:
            return {
                ...state,
                contentData: action.payload
            }
        case READ:
            return {
                ...state,
                content: action.payload
            }
        case CHATS:
            // console.log(action.payload)
            localStorage.setItem('data', JSON.stringify(action.payload))
            return {
                ...state,
                chats: action.payload
            }
        case SET_VALUES:
            // console.log(action.payload)
            state.content.writeError = action.payload
            return {
                ...state,
                content: state.content.writeError
            }
        default:
            return state;
    }
}
export default reducer