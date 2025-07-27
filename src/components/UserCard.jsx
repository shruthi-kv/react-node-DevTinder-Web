import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useEffect } from 'react';

const UserCard = ({user}) => {
     const dispatch = useDispatch();

    const handleSendRequest = async(status,_id) => {
        ///request/send/interested/68847feffd80fadf60f02b69
        // interested ignored
        // "interested","ignored"
        console.log(status, _id)
    
        try{
            const res = await axios.post(BASE_URL + '/request/send/' + status + "/" + _id , {}, { withCredentials: true })
             dispatch(removeUserFromFeed( _id));
        }catch(err){
            console.log(err.message)
        }
    }

    const {_id, firstName, lastName, age, gender, about} = user;
    return (
        <>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                    {age && gender && <p>{age + ' ' + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary" onClick={()=> handleSendRequest('ignored',_id)}>Ignore</button>
                        <button className="btn btn-secondary"  onClick={()=> handleSendRequest('interested',_id)}>Interested</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard;
