import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            console.log(user);
        });

        // if you are listening in real time , do a clean up else memory leak
        return () => {
            unsub();
        };

    } , []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );

};