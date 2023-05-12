import "./Header.scss";
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {IoIosArrowDown} from "react-icons/io";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
const Header = () => {
    const [scrolled,setScrolled] = useState(false);
    const {setAccount} = useContext(Context);
    const {address,isConnected} = useAccount();
    const [loginAs,setLoginAs] = useState("patient");
    
    const navigate = useNavigate();
    const handleScroll = ()=>{
        const offSet = window.scrollY;
        if(offSet > 200){
            setScrolled(true);
        }
        else setScrolled(false);
    }
    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
    },[]);

    useEffect(()=>{
        handleHome();
    },[isConnected]);// eslint-disable-line react-hooks/exhaustive-deps
    const handleChange = (e) =>{
        const s= e.currentTarget.value;
        setLoginAs(s);
    }
    const handleHome = ()=>{
        if(isConnected){
            setAccount(address);
        if(loginAs === "admin"){
            navigate("/admin");
        }
        else if(loginAs === "staff"){
            navigate("/staff");
        }
        else if(loginAs === "patient"){
            navigate("/patient");
        }
        else if(loginAs === "doctor"){
            navigate("/doctor");
        }
    }else{navigate("/")}
    }

    return (
    <>
    <header className={`main-header ${scrolled? "stickey-header":""}`}>
        <div className="header-content">
            <ul className="left">
                <li onClick={handleHome}>Home</li>
                <li onClick={()=>navigate("/about")}>About</li>
                <li onClick={()=>navigate("/contact")}>Contact</li>
                <li className="dropdown">
                    <a href="/" >Services <IoIosArrowDown></IoIosArrowDown></a>
                    <ul>
                        <li><Link to="/register/patient">Register as Patient</Link></li><hr />
                        <li><Link to="/appointment">Book Appointment</Link></li><hr/>
                        <li><Link to="/">Emergency</Link></li>
                    </ul>
                </li>
            </ul>    
            <div className="center" onClick={()=>navigate("/")}>MED 3</div>
            <div className="right">
            <ConnectButton chainStatus="icon" showBalance={false} />
            {<div className="custom-select"  style={{width:"200px"}} >
                <label>As : </label>
                <select value={loginAs} disabled={isConnected} onChange={handleChange}>   
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                </select>    
            </div>}
            
                
            </div>
        </div>
    </header>
    
    </>
    );
};

export default Header;
