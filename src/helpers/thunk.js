import { auth } from "../services/firebase";
import { setError } from "../Actions/action";

export const signup = (email, password) => async (dispatch, getState) => {
    try {
        return await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        dispatch(setError({ error: error.message }))
    }
}
export const signin = (email, password) => async (dispatch) => {
    try {
        return await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        dispatch(setError({ error: error.message }))
    }
}
export const signInWithGoogle = () => async (dispatch) => {
    try {
        const provider = new auth.GoogleAuthProvider();
        return await auth().signInWithPopup(provider);
    } catch (error) {
        dispatch(setError({ error: error.message }))
    }
}
export const signInWithGitHub = () => async (dispatch) => {
    try {
        const provider = new auth.GithubAuthProvider();
        return await auth().signInWithPopup(provider);
    } catch (error) {
        dispatch(setError({ error: error.message }))
    }
}
export const logout = () => async (dispatch) => {
    try {
        return await auth().signOut();
    } catch (error) {
        dispatch(setError({ error: error.message }))
    }
}