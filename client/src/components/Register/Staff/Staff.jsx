import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Context } from '../../../utils/context';
import { Box } from '@mui/material';
import "./Staff.scss";
// import { useEffect } from 'react';
function RStaff({account,contract,provider}) {
  const {staff,setStaff,owner} = useContext(Context);
  // const [STAFF,setSTAFF] = useState("");
  useEffect(()=>{
    // getStaff();
  },[staff] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const getStaff = async()=>{
    const signer = contract.connect(provider.getSigner());
    const tx = await signer.staff();
    console.log("Get Staff : ",tx);
    setStaff(tx);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const newAdd = e.target.newAddress.value;
    console.log("new staff : " ,newAdd);
    if(owner === account){
      const signer = contract.connect(provider.getSigner());
      const tx  = await signer.changeStaff(newAdd);
      // console.log(tx.wait());
      setStaff(newAdd);
    // console.log("new staff : " ,newAdd);
    // console.log("Status : ",tx);
    tx.wait().then(async (receipt) => {
      console.log(receipt);
      if (receipt && receipt.status === 1) {
         // transaction success.
         alert("Transaction mined Successfully");
      }
   });
  }
  else{
     alert("You are not the Owner!");
  }
  }
  return (
    <Box m="20px" display="block">

        <Box textTransform="uppercase" m="20px">Current Staff : {staff}</Box> 
        <Box m="20px">
        <form onSubmit={handleSubmit}>
          <Box className="inp-box-staff">
            <span className="head-staff">Change Staff :</span>
            <input type='text' name="newAddress" placeholder='Enter New Address'/>
          </Box>
          <Box className="btn">
            <input type="submit" value="CHANGE"/>
          </Box>
        </form>
        </Box>
    </Box>
  )
}

export default RStaff;