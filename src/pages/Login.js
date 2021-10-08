import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { setData, setError } from "../Actions/action";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/thunk";

const Login = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const handleChange = event => {
        dispatch(setData({ ...data, [event.target.name]: event.target.value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setError({ error: "" }));
        dispatch(signin(data.email, data.password));
    }
    const googleSignIn = async () => {
        dispatch(signInWithGoogle());
    }
    const githubSignIn = async () => {
        dispatch(signInWithGitHub());
    }
    return (
        <div className="container">
            <form
                className="mt-5 py-5 px-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h1>
                    Login to
                    <Link className="title ml-2" to="/">
                        Chat-Box
                    </Link>
                </h1>
                <p className="lead">
                    Fill in the form below to login to your account.
                </p>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={data.email}
                    />
                </div><br />
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        type="password"
                    />
                </div><br />
                <div className="form-group">
                    {data.error ? (
                        <p className="text-danger">{data.error}</p>
                    ) : null}
                    <button className="btn btn-primary px-5" type="submit">Login</button>
                </div>
                <p>You can also log in with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
                    Sign in with Google
                </button>{' '}
                <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
                    Sign in with GitHub
                </button>
                <hr />
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
export default Login