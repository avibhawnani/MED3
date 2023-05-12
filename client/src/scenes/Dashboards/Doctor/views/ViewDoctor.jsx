import React from 'react'
import { useEffect,useState } from 'react';
import "./ViewDoctor.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function ViewDoctor({account,contract,provider}) {
    const [details,setDetails] = useState([]);

    const [openPat,setOpenPat] = useState(false);
    const handleOpenPat = () => setOpenPat(true);
    const handleClosePat = () => setOpenPat(false);
    useEffect(()=>{
        const getDoctorDetail = async()=>{
            const signer = contract.connect(provider.getSigner());
            const tx  = await signer.getDoctorInfo(account,{gasLimit:100000});
            console.log(tx);
            setDetails(tx);
        }
        console.log("List : ",details);
        contract && getDoctorDetail();
      },[]// eslint-disable-line react-hooks/exhaustive-deps
      );
      
    return (
        <div className="content-pat">
        <div className='pat-dets'>
            <table >
            <tr>
              <th>Name</th>
              <th>Aadhar Number</th>
              <th>Contact</th>
             
              <th>Specialization</th>
              <th>Wallet Address</th>
              <th>Patient's List</th>

            </tr>
            {details && details["adhaar_number"]?
                <tr>
                  <td>{details["name"]}</td>
                  <td>{details["adhaar_number"].toString()}</td>
                
                  <td>{details["contact"]}</td>
                  <td>{details["specialization"]}</td>
                  <td>{details["id"]}</td>
                
                  <td><button onClick={handleOpenPat}>View</button></td>
                  
                  <div className="patList">
                  <Modal open={openPat} onClose={handleClosePat} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                          Patient's List
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div style={{fontSize:19 , textAlign:'left'}}>
                            { details.patient_list.length > 0 && details.patient_list.map((item) =><li>{item.slice(0,25)}... </li>)}
                          </div>
                      </Typography>
                  </Box>
                  </Modal>
                  </div>
                </tr>
            :<td>Fetching Data</td>
             }
              
        
          </table>
        </div>
        </div>
      )
}

export default ViewDoctor;
