import React from 'react'
import "./Appoint.scss";
import { useEffect,useState } from 'react';
function ViewAppoint({account,contract,provider}) {
    const [details,setDetails] = useState([]);
    useEffect(()=>{
        const getAppointment = async()=>{
            const signer = contract.connect(provider.getSigner());
            const tx  = await signer.getAppointmentDetails({gasLimit:100000});
            console.log(tx);
            setDetails(tx);
        }
        console.log("List : ",details);
        contract && getAppointment();
      },[]// eslint-disable-line react-hooks/exhaustive-deps
      );
    return (
        <div className='app-dets'>
            <table >
            <tr>
              <th>Appointment No.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Wallet Address</th>
              <th>Department to Visit</th>
              <th>Time Slot</th>
              
            </tr>
            {details && details.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.no.toNumber()+1}</td>
                  <td>{val.name}</td>
                  <td>{val.contact}</td>
                  <td>{val.id}</td>
                  <td>{val.deptToVisit}</td>
                  <td><button>{val.timeSlot}</button></td>
                </tr>
              )
            })}
          </table>
        </div>
      )
}

export default ViewAppoint;