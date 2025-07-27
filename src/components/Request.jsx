import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest } from '../utils/requestSlice';


const Request = () => {
    const requests = useSelector((store) => store.request)
    const dispatch = useDispatch();

    const fetchRequest = async () => {

        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true })
            dispatch(addrequest(res?.data?.data));
            console.log(res?.data?.data,"---llldata")
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    console.log(requests)

    if (!requests) return;
    if (requests.length === 0) return <h1>No requests Found !</h1>



    return(
         <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Requests</h1>
            {
                requests.map((request) => {
                    const {_id, firstName, lastName, age, gender, about, photoURL } = request.fromUserId;
                    return (
                        <div key={_id} className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div> <img alt="photo" className="w-20 h-20 rounded-full" src={photoURL ? photoURL : ''} /></div>

                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{firstName + ' ' + lastName}</h2>
                                {age && gender && (<p>{age + ' ' + gender}</p>)}
                                <p>{about}</p>
                                </div>
                                            <div>
                                <button className="btn btn-primary mx-2">Reject</button>
                                <button className="btn btn-secondary mx-2">Accept</button>

                            </div>

                        </div>
                        
                    )

                })
            }

        </div>
    )
}

export default Request;
