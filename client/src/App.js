import React from 'react'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home"
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import {Routes,Route } from "react-router-dom";
import RPatient from './components/Register/Patient/Patient';
import RDoctor from './components/Register/Doctor/Doctor';
import Appoint from "./components/Register/Appointment/appoint";
import RStaff from './components/Register/Staff/Staff';
import About from "./components/About/About";
import { useEffect,useState } from 'react';
import AppContext from "./utils/context";
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider,darkTheme,} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli,WagmiConfig, useAccount } from 'wagmi';
import { polygonMumbai} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Admin from './scenes/Dashboards/Admin/Admin';
import Staff from './scenes/Dashboards/Staff/Staff';
import Doctor from "./scenes/Dashboards/Doctor/Doctor";
import Patient from "./scenes/Dashboards/Patient/Patient";
import { ethers } from 'ethers';
// import ViewDetails from "./scenes/Dashboards/Patient/views/ViewDetails"
// import detectEthereumProvider from '@metamask/detect-provider';
import ABI from "./artifacts/contracts/Hospital.sol/Hospital.json";
import ViewDoctor from './scenes/Dashboards/Doctor/views/ViewDoctor';
import ViewDocList from './scenes/Dashboards/Admin/views/viewDocList';
import ViewPatList from './scenes/Dashboards/Admin/views/viewPatList';
import ViewDetailPat from './scenes/Dashboards/Patient/views/ViewDetailPat';
import ViewAppoint from './scenes/Dashboards/Staff/views/ViewAppoint';
import UploadDoc from './scenes/Dashboards/Patient/views/UploadDoc';
import GrantDoc from './scenes/Dashboards/Patient/views/GrantDoc';
import PatientInfo from './scenes/Dashboards/Doctor/views/PatientInfo';
import ManageAppoint from './scenes/Dashboards/Doctor/views/ManageAppoint';
const { chains, provider, webSocketProvider } = configureChains([goerli,polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'MED3',
  projectId: process.env.PROJECT_ID,
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});
const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const {address,isConnected} = useAccount();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if(isConnected){setAccount(address)}
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5444655e58702265dcC589B2053d8f30f288eB3A";

        const contract = new ethers.Contract(
          contractAddress,
          ABI.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
    
  }
  , []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    
    // <BrowserRouter>
    
      
    <AppContext>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}  modalSize="compact" theme={darkTheme()} initialChain={polygonMumbai}>
    <Header></Header>
    <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/about' element={<About></About>}></Route>
        <Route exact path='/register/patient' element={<RPatient account={account} provider={provider} contract={contract}></RPatient>}> </Route>
        <Route exact path='/register/doctor' element={<RDoctor account={account} provider={provider} contract={contract}></RDoctor>}> </Route>
        <Route exact path='/register/staff' element={<RStaff account={account} provider={provider} contract={contract}></RStaff>}> </Route>
        <Route exact path='/make_appointment' element={<Appoint account={account} provider={provider} contract={contract}></Appoint>}> </Route>
        <Route exact path='/admin/' element={<Admin></Admin>}> </Route>
        <Route exact path='/doctor' element={<Doctor></Doctor>}> </Route>
        <Route exact path='/staff' element={<Staff></Staff>}> </Route>
        <Route exact path='/patient' element={<Patient></Patient>}> </Route>
        <Route exact path='/patient/view_details' element={<ViewDetailPat account={account} provider={provider} contract={contract}></ViewDetailPat>}> </Route>
        <Route exact path='/doctor/view_details' element={<ViewDoctor account={account} provider={provider} contract={contract}></ViewDoctor>}> </Route>
        <Route exact path='/admin/view_details/doctor_list' element={<ViewDocList account={account} provider={provider} contract={contract}></ViewDocList>}> </Route>
        <Route exact path='/view_details/patient_list' element={<ViewPatList account={account} provider={provider} contract={contract}></ViewPatList>}> </Route>
        <Route exact path='/view_details/appointment_list' element={<ViewAppoint account={account} provider={provider} contract={contract}></ViewAppoint>}> </Route>
        <Route exact path='/upload_docs' element={<UploadDoc account={account} provider={provider} contract={contract}></UploadDoc>}> </Route>
        <Route exact path='/access' element={<GrantDoc account={account} provider={provider} contract={contract}></GrantDoc>}> </Route>
        <Route exact path='/patient_info' element={<PatientInfo account={account} provider={provider} contract={contract}></PatientInfo>}> </Route>
        <Route exact path='/manage_appointment' element={<ManageAppoint account={account} provider={provider} contract={contract}></ManageAppoint>}> </Route>


    </Routes>
    <Newsletter></Newsletter>
    <Footer></Footer>
    </RainbowKitProvider>
    </WagmiConfig>
    </AppContext>
  
  )
}
export default App;