import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/services";
import {io} from 'socket.io-client';

export const AuthContext = createContext();

const socket = io('http://localhost:5000');

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        instrument: "",
        password: "",
        isAdmin: false,
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        name: "",
        password: "",
    });
    const [isSongSelected, setIsSongSelected] = useState(false);

    console.log('userr:', user);
    console.log('registerInfo:', registerInfo);

    useEffect(() => {
        const user = localStorage.getItem("User");
        if(user){
           setUser(JSON.parse(user));
        }
    }, []);

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info);
    }, [])

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info);
    }, [])

    const registerUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);
        if(response.error){
            return setRegisterError(response);
        } 
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const registerAdminUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        
        const response = await postRequest(`${baseUrl}/users/admin-register`, JSON.stringify(registerInfo));    
        setIsRegisterLoading(false);
        if(response.error){
            return setRegisterError(response);
        } 
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const loginUser = useCallback(async(e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        
        setIsLoginLoading(false);
        
        if(response.error){
            return setLoginError(response);
        }
        
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [loginInfo]);

    const logoutUser = useCallback(() => { 
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    const joinRehearsal = (userId) => {
        socket.on('connect', () => {
            console.log('Connected to server');
          });
        socket.emit('join-rehearsal', userId);
    };

    const [songData, setSongData] = useState(null);

  return (
    <AuthContext.Provider 
        value={{ 
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            loginInfo,
            updateLoginInfo,
            loginUser,
            loginError,
            isLoginLoading,
            logoutUser,
            registerAdminUser,
            joinRehearsal,
            socket,
            isSongSelected,
            setIsSongSelected,
            songData,
            setSongData,
        }}>
        {children}
    </AuthContext.Provider>
  );
};
