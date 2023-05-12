import SidebarD from "../../../components/Sidebar/SidebarD";
import "./Doctor.scss";
function Doctor() {
  return (
      <div className="doc-dash">
      <SidebarD></SidebarD>
        <div style={{fontSize:30 , fontWeight:10, margin:20,fontFamily:"serif"}}>Hello Doctor !</div>

    </div>
  );
}
export default Doctor;
