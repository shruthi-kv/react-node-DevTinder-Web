import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { addUser } from '../utils/userSlice'; // <-- Adjust the path if needed
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/constants'


const Login = () => {
    // const [email, setemail] = useState("Macbook@gmail.com");
    // const [password, setPassword] = useState("Macbook@123");

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogin, setIsLoginForm] = useState(true)


    const [error, setError] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();




    const handleSubmit = async () => {

        try {
            const res = await axios.post(BASE_URL + '/login', {
                email,
                password
            }, { withCredentials: true })


            dispatch(addUser(res.data))
            navigate('/')
        } catch (err) {

            setError(err?.response?.data || 'Something went Wrong')
        }

    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + '/signup', {
                firstName, lastName,
                email,
                password
            }, { withCredentials: true })


             dispatch(addUser(res?.data?.data))
             navigate('/profile')



        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="flex justify-center my-10"><div class="card card-border bg-base-300 w-96">
            <div class="card-body">
                <h2 class="card-title justify-center" >{isLogin ? "Login" : "Sign up"}</h2>
                <div>
                    {!isLogin &&
                        <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input aria-label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name </legend>
                                <input  aria-label="Last Name"  type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                        </>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input  aria-label="Email" type="text" value={email} onChange={(e) => setemail(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password </legend>
                        <input  aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div class="card-actions justify-center m-2">
                    <button class="btn btn-primary" onClick={isLogin ? handleSubmit : handleSignup}>{isLogin ? 'Login' : 'Sign Up'}</button>
                </div>
                <p className="m-auto cursor-pointer py-2 " onClick={() => setIsLoginForm(!isLogin)}>{!isLogin ? 'New User ? Sign Up Here' : 'Existing User ? Login here'}</p>
            </div>
        </div>
        </div>
    )
}

export default Login;
