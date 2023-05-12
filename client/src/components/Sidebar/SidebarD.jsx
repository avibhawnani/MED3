import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography} from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import BadgeIcon from '@mui/icons-material/Badge';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Item from "./Item";


const SidebarD = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#F3E8FF !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{height:"140%"}}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#383838",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color="#383838">
                  DOCTOR
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/doctor"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#383838"
              sx={{ m: "15px 0 5px 20px" }}
            >
              View
            </Typography>
            <Item
              title="Appointments"
              to="/view_details/appointment_list"
              icon={<TableViewIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Details"
              to="/doctor/view_details"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Patient Info"
              to="/patient_info"
              icon={<ContactEmergencyIcon  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color="#383838"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            <Item
              title="Appointments"
              to="/manage_appointment"
              icon={<MobileFriendlyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Patients"
              to="/"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Staff"
              to="/register/staff"
              icon={<BadgeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarD;