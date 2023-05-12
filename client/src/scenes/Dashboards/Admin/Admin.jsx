  import Sidebar from "../../../components/Sidebar/Sidebar";
  import { Box } from "@mui/material";
  import "./Admin.scss";
  function Admin() {
    return (
        <Box display="flex">
          <Sidebar/>
          <Box ml="15px">
          <div style={{fontSize:30 , fontWeight:10, margin:20,fontFamily:"serif"}}>Hello Admin !</div>
          </Box>
        </Box>
        
    );
  }
  export default Admin;
