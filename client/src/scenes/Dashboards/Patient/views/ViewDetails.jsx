import * as React from 'react';
import "./ViewDetails.scss";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function ViewDetail({account,contract,provider}) {
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [gender,setGender] = useState("");
  const [wAdd, setWAdd] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [patientFiles,setPatientFiles] = useState([]);
  const handleGet = async(e)=>{
    e.preventDefault();
    const signer = contract.connect(provider.getSigner());
    const tx  = await signer.getPatientInfo(wAdd);
    console.log("Patient Details",tx); 
    if(tx["name"]===""){alert("No Patient Found !");}
    setName(tx["name"]);
    setAadhar(tx["adhaar_number"]);
    setContact(tx["contact"]);
    setDob(tx["dob"]);
    setWAdd(tx["id"]);
    setDoctorList(tx["doctor_list"]);
    setPatientFiles(tx["files"]);
    setGender(tx["gender"]);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container  align="center" className='contain'>
        
        <Typography variant='h4' align='center' m="10px"> Patient Details</Typography>
            <Box align="left" className="cont">
            Name <TextField fullWidth id="standard-basic" name="name" value={name.toUpperCase()}  variant="standard" />
            DOB <TextField fullWidth id="standard-basic" name="dob" value={dob} variant="standard" />
            Aadhar Number <TextField fullWidth id="standard-basic" value={aadhar} name="aadhar" variant="standard" />
            Gender <TextField fullWidth id="standard-basic" name="gender" value={gender.toUpperCase()}  variant="standard" />
            Contact <TextField fullWidth id="standard-basic" name="contact" value={contact}  variant="standard" />
            Wallet Address <TextField fullWidth id="standard-basic" name="wAdd" value={wAdd} placeholder='Enter Wallet Address'  variant="standard" onChange={(e)=>{setWAdd(e.target.value)}}/>
            Doctors <TextField fullWidth id="standard-basic" name="doc" value={doctorList} variant="standard" />
            Records <TextField id="standard-multiline-static" name="records" value={patientFiles}multiline rows={4} variant="standard"/>
            </Box>
            <Box m="20px"><Button variant="contained" onClick={handleGet}> Get Details</Button></Box>
      </Container>
    </React.Fragment>
  );
}