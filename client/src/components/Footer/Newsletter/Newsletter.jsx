import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import "./Newsletter.scss";
const Newsletter = () => {
    return( 
    <div className="newsletter-section">
        <div className="newsletter-content">
            <span className="small-text">Newsletter</span>
            <span className="big-text">Sign up for latest updates and offers.</span>
            <div className="form">
                <input type="text" name="" id="" placeholder="Email Address" autoFocus/>
                <button>Subscribe</button>
            </div>
            <div className="text">Will be used in accordance with our privacy policy.</div>
            <div className="social-icons">
                <div className="icon">
                <FaFacebookF fontSize={14}></FaFacebookF>
                </div>
                <div className="icon">
                <FaTwitter fontSize={14} ></FaTwitter>
                </div>
                <div className="icon">
                <FaInstagram fontSize={14}></FaInstagram>
                </div>
                <div className="icon">
                <FaLinkedinIn fontSize={14} ></FaLinkedinIn>
                </div>
            </div>
        </div>
    </div>
    
    
    
    );
};

export default Newsletter;
