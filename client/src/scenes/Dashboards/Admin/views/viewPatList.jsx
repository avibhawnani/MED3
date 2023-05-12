import React from 'react'
import "./viewPatList.scss";
import { useState,useEffect } from 'react';
function ViewPatList({account,provider,contract}) {
    const [list,setList] = useState([]);
    useEffect(()=>{
        const getPatientList = async()=>{
            const signer = contract.connect(provider.getSigner());
            const tx  = await signer.getAllPatient({gasLimit:100000});
            console.log(tx);
            setList(tx);
        }
        console.log("List : ",list);
        contract && getPatientList();
      },[]// eslint-disable-line react-hooks/exhaustive-deps
      );
    return (
        <div className='pat-list-new'>
          <table >
            <tr>
              <th>SNo.</th>
              <th>Patient's Wallet Address</th>
            </tr>
            {list && list.map((val, key) => {
              return (
                
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{val}</td>
                </tr>
              
              )
            })}
          </table>
        </div>
      )
}

export default ViewPatList;