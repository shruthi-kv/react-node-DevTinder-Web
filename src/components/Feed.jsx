
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard'


const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    const hendleFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
            dispatch(addFeed(res.data));
        } catch (err) {
            console.log(err) //TODO- errorScreen
        }
    }

    useEffect(() => {
        hendleFeed()
    }, [])

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )

    )
}

export default Feed;