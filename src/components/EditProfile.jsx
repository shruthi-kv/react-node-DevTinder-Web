import { useState } from 'react';
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoURL, setPhotoURL] = useState(user.photoUrl);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);


    const dispatch = useDispatch();

    const saveProfile = async () => {


        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, age, gender, about, photoURL }, { withCredentials: true });
          
 setError(""); 
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            }, 3000)

        } catch (err) {
            setError(err?.response?.data || 'Something went Wrong')
        }

    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10 "><div class="card card-border bg-base-300 w-96">
                    <div class="card-body">
                        <h2 class="card-title justify-center" >Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name </legend>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age </legend>
                                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                            {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">About </legend>
                            <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input" placeholder="Type here" />
                        </fieldset> */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL </legend>
                                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="input" placeholder="Type here" />
                            </fieldset>
                        </div>
                  
                         <p className="text-red-500">{error}</p> {/* <-- render error */}
                        <div class="card-actions justify-center m-2">
                            <button onClick={saveProfile} class="btn btn-primary" >Save Profile</button>
                        </div>
                        {/* {res && <p>{res?.data?.message}</p>} */}
                    </div>
                </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile Saved successfully.</span>
                </div>
            </div>}


        </>

    )
}

export default EditProfile;
