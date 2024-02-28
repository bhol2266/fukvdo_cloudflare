import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();
import { useRouter } from "next/router";


export const AuthContextProvider = ({ children }) => {

    const router = useRouter();
    const [user, setUser] = useState();

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // Send user info to backend API
            sendUserInfoToBackend(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = () => {
        router.push('/');
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user])

    const sendUserInfoToBackend = async (userdata) => {
        
        router.push('/'); // Assuming '/dashboard' is the desired destination
        const object = { firstName: userdata.displayName, lastName: "", email: userdata.email, password: "", country: "" }
        try {
            const response = await fetch(process.env.BACKEND_URL + 'chutlunds/fb_googleLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}