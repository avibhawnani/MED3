import "./Doctor.scss";
import React, { useContext} from 'react';
// import {useLocation} from "react-router-dom";
import { Context } from "../../../utils/context";
const RDoctor = ({account,provider,contract}) =>{
  const {owner} = useContext(Context);
  // const location = useLocation();
  // useEffect(()=>{
  //   window.scrollTo(0,0);
  // },[location]);
  console.log("In Reg Doc : Ac",account);
  console.log("Provider : ", provider)
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const doc = {
      name:e.target.dname.value,
      aadhar:e.target.aadhar.value,
      contact:e.target.contact.value,
      spec:e.target.spec.value,
      gender:e.target.gender.value,
      wAdd:e.target.wAdd.value
    }
    
    console.log(doc["name"]);
    console.log("admin: ",account);
    const signer = contract.connect(provider.getSigner());
    console.log("Signer: ",signer);
    if(account === owner){
    const tx = await signer.addDoctor(doc["name"],doc["contact"],doc["spec"],doc["aadhar"],doc["wAdd"]);
    console.log("Info: ",tx );
    tx.wait().then(async (receipt) => {
      console.log(receipt);
      if (receipt && receipt.status === 1) {
         alert("Transaction mined Successfully");
      }
   });
    }
    else{alert("You are not an ADMIN!");}

  }
    return(
    <div className="full-content">
    <div className="container">
    <div className="title">Doctor Registration</div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" name="dname" placeholder="Enter your name" required/>
          </div>
          <div className="input-box">
            <span className="details">Specialization</span>
            <input type="text" name="spec" placeholder="Eg. Cardiologist" required/>
          </div>
          <div className="input-box">
            <span className="details">Aadhar Number</span>
            <input type="number" name="aadhar" placeholder="Enter your aadhar" required/>
          </div>
          <div className="input-box">
            <span className="details">Contact Details</span>
            <input type="number"  name="contact" placeholder="Enter your number" required/>
          </div>
          <div className="input-box">
            <span className="details">Wallet Address</span>
            <input type="text" name="wAdd"  placeholder="Eg. 0x1F8E7..." required/>
          </div>
        </div>
        <div className="gender-details">
          <input type="radio" name="gender" value="male" id="dot-1"/>
          <input type="radio" name="gender" value ="female" id="dot-2"/>
          <input type="radio" name="gender" value="others" id="dot-3"/>
          <span className="gender-title">Gender</span>
        <div className="category">
            <label htmlFor="dot-1" >
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label htmlFor="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          <label htmlFor="dot-3">
            <span className="dot three"></span>
            <span className="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Register"/>
        </div>
       
      </form>
    </div>
  </div>
    </div>
    );
}

export default RDoctor;