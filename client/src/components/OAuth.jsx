import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL 
                }),
            });
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('coud not sign in with google', error.message);
        }
    }        

    return <>
        <button
            onClick={handleGoogleClick}
            type="button"
            className="bg-red-600 text-white p-3 uppercase rounded-md font-semibold hover:opacity-90"
        >
            Continue with google
        </button>
    </>
};