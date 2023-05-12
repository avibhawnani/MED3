import React from 'react'
import "./ManageAppoint.scss";
import { useEffect,useState } from 'react';
function ManageAppoint({account,contract,provider}) {
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
    const handleDelete = async(e,id)=>{
        e.preventDefault();
        const signer = contract.connect(provider.getSigner());
        const num = id.toNumber();
        const tx  = await signer.deleteAppointments(num,{gasLimit:100000});
        tx.wait().then(async (receipt) => {
            console.log(receipt);
            if (receipt && receipt.status === 1) {
            alert("Transaction mined Successfully");
              }
            });
        console.log(num);
    }
    return (
        <div className='manage-appt'>
            <table >
            <tr>
              <th>Appointment No.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Wallet Address</th>
              <th>Department to Visit</th>
              <th>Time Slot</th>
              <th>Manage</th>
              
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
                  <td><button className='delete-btn' onClick={e=>handleDelete(e,val.no)}>Delete</button></td>
                </tr>
              )
            })}
          </table>
        </div>
      )
}

export default ManageAppoint;