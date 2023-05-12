import React from 'react'
import { useEffect,useState } from 'react';
import "./ViewDetailPat.scss";
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
function ViewDetailPat({account,contract,provider}) {
    const [details,setDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDoc,setOpenDoc] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenDoc = () => setOpenDoc(true);
    const handleCloseDoc = () => setOpenDoc(false);
    useEffect(()=>{
        const getPatientDetail = async()=>{
            
            const signer = contract.connect(provider.getSigner());
            const tx  = await signer.getPatientDetails({gasLimit:100000});
            console.log(tx);
            setDetails(tx);
        }
        console.log("List : ",details);
        contract && getPatientDetail();
      },[]// eslint-disable-line react-hooks/exhaustive-deps
      );
      
    return (
        <div className="content-patient">
        <div className='pat-dets'>
            <table >
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Aadhar Number</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Wallet Address</th>
              <th>Doctors</th>
              <th>Records</th>

            </tr>
            {details && details["adhaar_number"]?
                <tr>
                  <td>{details["name"]}</td>
                  <td>{details["dob"]}</td>
                  <td>{details["adhaar_number"].toString()}</td>
                  <td>{details["contact"]}</td>
                  <td>{details["gender"]}</td>
                  <td>{details["id"]}</td>
                  <td><button onClick={handleOpenDoc}>View</button></td>
                  <td><button  onClick={handleOpen} >View</button></td>

                  <div className='records'>
                  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                          Records List
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                          <div className='p-items' style={{fontSize:19 , textAlign:'left'}}>
                            { details.files.length > 0 && details.files.map((item,index) =><li><a href={item}>Record {index+1}</a></li>)}
                          </div>
                      </Typography>
                  </Box>
                  </Modal>
                  </div>
                  <div className="docList">
                  <Modal open={openDoc} onClose={handleCloseDoc} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                          Doctor List
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div style={{fontSize:19 , textAlign:'left'}}>
                            { details.doctor_list.length > 0 && details.doctor_list.map((item) =><li>{item.slice(0,25)}... </li>)}
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

export default ViewDetailPat