import React, { useEffect, useState } from 'react'
import "./GrantDoc.scss";
function GrantDoc({account,contract,provider}) {
  const [list,setList] = useState([]);
  
  useEffect(()=>{
    const getDoctorList = async()=>{
        const signer = contract.connect(provider.getSigner());
        const tx  = await signer.getDoctors({gasLimit:100000});
        console.log(tx);
        setList(tx);
    }
    console.log("List id: ",list["id"]);
    contract && getDoctorList();
  },[]// eslint-disable-line react-hooks/exhaustive-deps
  );
  const handleGrant = async(e,doc_id)=>{
    e.preventDefault();
    console.log(doc_id);
    const signer = contract.connect(provider.getSigner());
    const tx = await signer.grantAccessToDoctor(doc_id);
    console.log("tx : ",tx);
    tx.wait().then(async (receipt) => {
    console.log(receipt);
    if (receipt && receipt.status === 1) {
    alert("Transaction mined Successfully");
      }
    });
  }
  const handleRevoke = async(e,doc_id)=>{
    e.preventDefault();
    console.log(doc_id);
    const signer = contract.connect(provider.getSigner());
    const tx = await signer.revokeAccessFromDoctor(doc_id);
    console.log("tx : ",tx);
    tx.wait().then(async (receipt) => {
    console.log(receipt);
    if (receipt && receipt.status === 1) {
    alert("Transaction mined Successfully");
      }
    });
  }
//   console.log("List : ",list);
  return (
    <div className='al'>
        <table >
        <tr>
          <th>SNo.</th>
          <th>Name</th>
          <th>Aadhar Details</th>
          <th>Contact</th>
          <th>Specialization</th>
          <th>Wallet Address</th>
          <th>Access</th>
          <th></th>
        </tr>
        {list && list.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{val.name}</td>
              <td>{val.adhaar_number.toString()}</td>
              <td>{val.contact}</td>
              <td>{val.specialization}</td>
              <td>{val.id}</td>
              <td><button onClick={e=>handleGrant(e,val.id)}>Grant</button></td>
              <td><button onClick={e=>handleRevoke(e,val.id)}>Revoke</button></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default GrantDoc;