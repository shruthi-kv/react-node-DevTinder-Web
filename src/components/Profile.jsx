import EditProfile from './EditProfile'
import { useDispatch, useSelector } from 'react-redux';

const Profile = () =>{
    const user = useSelector((store) => store.user);
    
    return(
        user && (<EditProfile user={user}/>)
        
    )
}

export default Profile;