import SidebarP from "../../../components/Sidebar/SidebarP";
import "./Patient.scss";
import { Box } from "@mui/material";
function Patient() {
  return (
      <Box display="flex">
      <SidebarP></SidebarP>
      <Box display="block">
      <div style={{fontSize:30 , fontWeight:10, margin:20,fontFamily:"serif"}}>Hello Patient !</div>
      </Box>
    </Box>
  );
}
export default Patient;
