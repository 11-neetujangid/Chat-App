import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setData, setError } from '../Actions/action';
import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth';

const Signup = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const handleChange = event => {
        dispatch(setData({ ...data, [event.target.name]: event.target.value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setError({ error: '' }))
        try {
            await signup(data.email, data.password);
        } catch (error) {
            dispatch(setError({ error: error.message }))
        }
    }
    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            dispatch(setError({ error: error.message }))
        }
    }
    const githubSignIn = async () => {
        try {
            await signInWithGitHub();
        } catch (error) {
            console.log(error)
            dispatch(setError({ error: error.message }))
        }
    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Sign Up to
                        <Link to="/"> chatbox</Link>
                    </h1><br />
                    <p>Fill in the form below to create an account.</p>
                    <div>
                        <input placeholder="Email" className="form-control" name="email" type="email" onChange={handleChange}></input>
                    </div><br />
                    <div>
                        <input className="form-control" placeholder="Password" name="password" type="password" onChange={handleChange}></input>
                    </div><br />
                    <div>
                        {data.error ? <p className="text-danger">{data.error}</p> : null}
                        <button type="submit" className="btn btn-primary" >Sign up</button>
                    </div>
                    <p>You can also sign up with any of these services</p>
                    <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
                        Sign up with Google
                    </button>{' '}
                    <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
                        Sign up with GitHub
                    </button>
                    <hr></hr>
                    <p>Already have an account?<Link to="/login"> Login</Link></p>
                </form >
            </div >
        </div>
    )
}
export default Signup