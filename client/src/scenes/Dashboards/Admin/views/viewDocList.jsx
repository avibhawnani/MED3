import React, { useEffect, useState } from 'react'
import "./viewDocList.scss";
function ViewDocList({account,contract,provider}) {
  const [list,setList] = useState([]);
  
  useEffect(()=>{
    const getDoctorList = async()=>{
        const signer = contract.connect(provider.getSigner());
        const tx  = await signer.getDoctors({gasLimit:100000});
        console.log(tx);
        setList(tx);
    }
    console.log("List : ",list);
    contract && getDoctorList();
  },[]// eslint-disable-line react-hooks/exhaustive-deps
  );
  
//   console.log("List : ",list);
  return (
    <div className='ta'>
        <table >
        <tr>
          <th>SNo.</th>
          <th>Name</th>
          <th>Aadhar Details</th>
          <th>Contact</th>
          <th>Specialization</th>
          <th>Wallet Address</th>
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
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default ViewDocList