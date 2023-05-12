import React, { useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { Box } from '@mui/material';
import "./UploadDoc.scss";

function UploadDoc({account,contract,provider}) {
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("No File Selected");
    
    async function main (e) {
        e.preventDefault();
        
        // const args = minimist(process.argv.slice(2))
        const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0NUFhMEJCMzgzMjM2MUYwMGZiNTU3YTg5ODU5MTIyOGE5YzY4MjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM3MTU3ODM1NjQsIm5hbWUiOiJNRUQzIn0.UTVtNN7EzUfKKAhPKE1ys3t1OfY0lZDvjz0tVk5g49Y'
        const client = new Web3Storage({ token: apiToken });
        if (!apiToken) {
          return console.error('A token is needed. You can create one on https://web3.storage')
        }
        if(file){
        console.log(`Uploading  files`)
        const cid = await client.put([file])
        console.log('Content added with CID: ', cid);
        const imgHash = `https://dweb.link/ipfs/${cid}`;
        const signer = contract.connect(provider.getSigner());
        const tx = await signer.uploadDocs(imgHash);
        console.log("tx : ",tx);
        tx.wait().then(async (receipt) => {
        console.log(receipt);
        if (receipt && receipt.status === 1) {
         alert("Transaction mined Successfully");
      }
    });
        }
        else{console.log("No file selected!")}
      }
      
    // const handleSubmit = async(e)=>{
    // e.preventDefault();
    // console.log("FILE",file)
    // console.log("FileName : ",file)
    // if(file){
    //     try{
    //             const formData = new FormData();
    //             formData.append("file",file);
    //             const resFile = await axios({
    //                 method: "post",
    //                 url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //                 data: formData,
    //                 headers: {
    //                   pinata_api_key:`bbf7652756524c43e0ef`,
    //                   pinata_secret_api_key:`e9eaf7f4fca715fabaaf71c23c300eaf6796fbb7b133d1af42d89cf4c1770c4d`,
    //                   "Content-Type": "multipart/form-data",
    //                 },
    //               }); 
    //               const imgHash = `ipfs://${resFile.data.IpfsHash}`;
    //               const signer = contract.connect(provider.getSigner());
    //               await signer.uploadDocs(imgHash);
    //               alert("Image uploaded successfully!");
    //               setFileName("No image selected");
    //               setFile(null);
    //     }
    //     catch(e){
    //         alert("Unable to upload image to Pinnata.");
    //     }
    
//   }
  const retrieveFile = (e)=>{
    const data = e.target.files[0];
    if(data){
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
        setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
    }
    else{console.log("Please choose a file.")}
}
  return (
    <Box m="20px" display="block" className="cont-up" > 
        <Box textTransform="uppercase" textAlign="center" marginTop="40px" marginBottom="150px" fontSize="25px">Upload Document</Box>
        <Box className="top">
        <form className="form" onSubmit={main}>
            <Box display="flex"  textAlign="center" justifyContent="center">
            <label htmlFor="file-upload" className="choose" style={{marginRight:"10px", textTransform:"uppercase"}}>
                Choose File : 
            </label>
            
            <input type="file" disabled={!account} id="file-upload" name="data" onChange={retrieveFile} />
            
            <span className="textArea" >FILE : {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload</button>
            </Box>
        </form>
    </Box>
    </Box>
  )
}

export default UploadDoc