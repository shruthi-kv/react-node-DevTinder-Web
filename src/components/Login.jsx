import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { addUser } from '../utils/userSlice'; // <-- Adjust the path if needed
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/constants'


const Login = () => {
    // const [email, setemail] = useState("Macbook@gmail.com");
    // const [password, setPassword] = useState("Macbook@123");

    const [email, setemail] = useState("shruthi@gmail.com");
    const [password, setPassword] = useState("Shruthi@123");
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

    return (
        <div className="flex justify-center my-10"><div class="card card-border bg-base-300 w-96">
            <div class="card-body">
                <h2 class="card-title justify-center" >Login</h2>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password </legend>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div class="card-actions justify-center m-2">
                    <button class="btn btn-primary" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login;
