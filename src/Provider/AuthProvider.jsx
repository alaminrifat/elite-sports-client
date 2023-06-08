import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.config.js";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

const google_provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, google_provider);
    };
    const loginWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateInfo = (name, url) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url,
        });
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser);
            setPhoto(loggedUser?.photoURL);
            setName(loggedUser?.displayName);

            if (loggedUser) {
                axios.post("http://localhost:5000/jwt", {
                    email: loggedUser.email,
                }).then(data => {
                    localStorage.setItem('access-token',data.data.token);
                })
            }else{
                localStorage.removeItem('access-token')
            }

            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        createUser,
        updateInfo,
        googleSignIn,
        loginWithEmail,
        logOut,
        loading,
        photo,
        name,
        setLoading,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
