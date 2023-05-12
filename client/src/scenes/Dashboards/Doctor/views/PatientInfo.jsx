import React from 'react'
import { useEffect,useState } from 'react';
import "./PatientInfo.scss";
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
function PatientInfo({account,contract,provider}) {
    const [details,setDetails] = useState([]);
    const [patList,setPatList] = useState([]);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(()=>{
        
        const getPatientInfo = async()=>{
            const doc = contract.connect(provider.getSigner());
            const tx1  = await doc.getDoctorInfo(account,{gasLimit:100000});
            console.log(tx1);
        
            const li =  tx1["patient_list"];
            console.log("LI",li)
            setPatList(li);

            for(let i=0;i<li.length;i++){
                const sig = contract.connect(li[i]);
                const tx  = await sig.getPatientDetails({gasLimit:100000});
                setDetails(tx);
                console.log(tx);

            }
            console.log("ANS",patList);
        }
        console.log("List : ",details);
        contract && getPatientInfo();
      },[]// eslint-disable-line react-hooks/exhaustive-deps
      );
    return (
        <div className="content-pat">
        <div className='pat-dets-doc'>
            <table >
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Wallet Address</th>
              <th>Records</th>

            </tr>
            {details && details["adhaar_number"]?
                <tr>
                  <td>{details["name"]}</td>
                  <td>{details["dob"]}</td>
                  <td>{details["contact"]}</td>
                  <td>{details["gender"]}</td>
                  <td>{details["id"]}</td>
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
                  
                </tr>
            :<td>Fetching Data</td>
             }
              
        
          </table>
        </div>
        </div>
      )
}

export default PatientInfo;