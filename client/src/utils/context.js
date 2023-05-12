import React, { createContext,useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
// import { useAccount } from "wagmi";
export const Context = createContext();

function AppContext ({children}){
    const location = useLocation();
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    // const {address,isConnected} = useAccount();
    const owner = "0xEa1c9a561941a445b119D9555497CA028712732e";
    const initialStaff = "0x83c451419875DE91d8AcB43C1261FfF7Eb316AD0";
    const [staff,setStaff] = useState(initialStaff);
    
  
    
    useEffect(()=>{
        window.scrollTo(0,0);
      },[location]);

return(<Context.Provider value={{account,setAccount,contract,setContract,provider,setProvider,owner,staff,setStaff}}>{children}</Context.Provider>);
}
export default AppContext;