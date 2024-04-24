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
import { saveUserProfile, updateloggedIn } from "@/config/firebase/lib";


export const AuthContextProvider = ({ children }) => {

    const router = useRouter();
    const [user, setUser] = useState();

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
        //save user details to firestore
            router.push("/"); // Assuming '/dashboard' is the desired destination
            saveUserProfile(result.user.displayName, "", result.user.email, "", true, "", true, false, [])

        } catch (error) {
            console.error(error);
        }
    };

    const logOut = () => {
        router.reload();
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user])

  

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}