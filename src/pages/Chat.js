import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setContent } from "../Actions/action";
import { useEffect } from "react";
import React from "react";
import { db } from "../services/firebase";
import { read, Chats, setValues } from "../Actions/action";
import { auth } from '../services/firebase';

const Chat = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.content);
    const content = useSelector(state => state.contentData);
    // const chat = useSelector(state => state.chats);
    let user = auth().currentUser;
    const chats = JSON.parse(localStorage.getItem('data'))

    useEffect(() => {
        dispatch(read({ readError: null, loadingChats: true }));
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort(function (a, b) { return a.timestamp - b.timestamp })
                dispatch(Chats(chats));
                dispatch(read({ loadingChats: false }));
            });
        } catch (error) {
            dispatch(read({ readError: error.message, loadingChats: false }));
        }
    }, [])

    const handleChange = (event) => {
        dispatch(setContent(event.target.value))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setValues({ writeError: null }))
        try {
            await db.ref("chats").push({
                content: content,
                timestamp: Date.now(),
                uid: user.uid
            });
            dispatch(setContent({ content: '' }));
        } catch (error) {
            dispatch(setValues({ writeError: error.message }));
        }
    }
    const formatTime = (timestamp) => {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
    }
    return (
        <div>
            <Header />
            <div className="chat-area">
                {data.loadingChats ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading..</span>
                </div> : ""}
                {chats.map(chat => {
                    return <p key={chat.timestamp} className={"chat-bubble " + (user.uid === chat.uid ? "current-user" : "")}>
                        {chat.content}
                        <br />
                        <span className="chat-time float-right">{formatTime(chat.timestamp)}</span>
                    </p>
                })}
                <form className="mx-3" onSubmit={handleSubmit}>
                    <textarea className="form-control" name="content" onChange={handleChange} ></textarea>
                    {data.error ? <p className="text-danger">{data.error}</p> : null}
                    <button type="submit" className="btn btn-success">Send</button>
                </form>
                <div className="py-5 mx-3">
                    Login in as: <strong className="text-info">{user.email}</strong>
                </div>
            </div>
        </div >
    )
}
export default Chat