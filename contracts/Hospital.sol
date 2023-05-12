// SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;
contract Hospital{

  address public owner;                           
  address public staff;
  mapping (address => doctor) private Doctors;     
  mapping (address => patient) private Patients;   
  mapping (address => mapping(address => uint16)) private patientToDoctor;      
  doctor[] private docList;
  address[] private pList;
  Appointment[] private apList;
  uint ap_No;
  
  struct Appointment{
    uint no;
    address id;
    string name;
    string contact;
    string deptToVisit;
    string timeSlot;
  }

  struct patient{
      string name;
      string dob;
      uint64 adhaar_number;
      string gender;
      string contact;
      address id;
      string[] files; 
      address[] doctor_list;
  }

  struct doctor{
    string name;
    uint64 adhaar_number;
    string contact;
    string specialization;
    address id;
    address[] patient_list;
  }

  constructor(address _s){
    owner = msg.sender;
    staff = _s;
    ap_No = 0;
  }

  modifier checkDoctor(address id){
      doctor memory d = Doctors[id];
      require( d.id > address(0x0) ,"You are not an authorized Doctor");
      _;
  }
  modifier checkPatient(address id){
      patient memory p = Patients[id];
      require( p.id > address(0x0),"You are not an authorized Patient");
      _;
  }
  modifier onlyOwner(){
      require(msg.sender == owner,"You are not the authorized Owner");
      _;
  }
  modifier onlyStaff(){
      require(msg.sender == staff,"You are not the authorized Staff");
      _;
  }

  event patientRegister( address _patient, string message);
  event doctorRegister(address _doctor, string message);
  event revokeDoctorAccess(address patient_address, string message, string _doctor, address doctor_address);
  event grantDoctorAccess( address patient_address, string message, string _doctor, address doctor_address);


  function changeStaff(address _a) onlyOwner external {
    staff = _a;
  }
 
  function getPatientDetails() external view checkPatient(msg.sender) returns(patient memory){  //only Patient
    patient memory p = Patients[msg.sender];
    return p;
  }

  function getAllPatient() external view returns(address[] memory){
    return pList;
  }

  // function getOnlyPatient()external view returns(){}
  function uploadDocs(string memory  _file) external checkPatient(msg.sender){
    patient storage p = Patients[msg.sender];
    p.files.push(_file);
  }
  
  
  function addPatient(string memory _name,string memory _DOB,string memory _contact,string memory _gen,uint64 _adhaar_number,address _ad) onlyStaff external{
    patient storage p = Patients[_ad];
    require(!(p.id > address(0x0)));
    Patients[_ad] = patient({name:_name,dob:_DOB,id:_ad,adhaar_number:_adhaar_number,gender:_gen,contact:_contact,files:new string[](0),doctor_list:new address[](0)});
    pList.push(_ad);
    emit patientRegister( _ad, "Registered as Patient");
  }

  function getDoctorInfo(address _d) external view  returns(doctor memory){
    doctor memory d = Doctors[_d];    
    return d;
  }

  function getDoctors() external view returns(doctor[] memory){
    return docList;
  }

  function addDoctor(string memory _name, string memory _contact, string memory _specialization,uint64 _adhaar_number,address _ad) onlyOwner external{
      doctor storage d = Doctors[_ad];
      require(!(d.id > address(0x0)));
      Doctors[_ad] = doctor({name:_name,id:_ad,adhaar_number:_adhaar_number,contact:_contact,specialization:_specialization,patient_list:new address[](0)});
      docList.push(doctor({name:_name,id:_ad,adhaar_number:_adhaar_number,contact:_contact,specialization:_specialization,patient_list:new address[](0)}));
      emit doctorRegister(_ad, "Registered as Doctor");
  }

  
  function takeAppointment(address _id, string memory _name, string memory _contact,string memory _dept, string memory _timeS) external {
      apList.push(Appointment(ap_No,_id,_name,_contact,_dept,_timeS));
      ap_No ++;
  }

  function getAppointmentDetails() external view returns(Appointment[] memory){
    return apList;
  }

  function deleteAppointments(uint _no) external onlyStaff {

      require(_no <= ap_No,"Enter a valid Appointment ID");
      uint pos = 0;

      for(uint i=0;i< ap_No;i++){
        Appointment memory a = apList[i];
        if(a.no == _no){
          pos = i;
          break;
        }
      }
      for(;pos<ap_No-1;pos++){
          apList[pos] = apList[pos+1];
      }
      apList.pop();
  }

//  -------------------- Grant Revoke
    
  function grantAccessToDoctor(address doctor_id) public checkPatient(msg.sender) checkDoctor(doctor_id) {
  
      patient storage p = Patients[msg.sender];
      doctor storage d = Doctors[doctor_id];
      require(patientToDoctor[msg.sender][doctor_id] < 1);// this means doctor already been access
      
      p.doctor_list.push(doctor_id);// new length of array
      uint16 pos = uint16(p.doctor_list.length);
      patientToDoctor[msg.sender][doctor_id] = pos;
      d.patient_list.push(msg.sender);
      
      emit grantDoctorAccess( msg.sender , "Granted access to doctor", d.name , doctor_id);
  }
  

  function revokeAccessFromDoctor(address doctor_id) public checkPatient(msg.sender){
    require(patientToDoctor[msg.sender][doctor_id] > 0);
    patientToDoctor[msg.sender][doctor_id] = 0;

    patient storage p = Patients[msg.sender];
    doctor storage d = Doctors[doctor_id];

    uint16 pdlength= (uint16)(p.doctor_list.length);
    uint16 pos=0;

    for (uint16 i = 0; i < pdlength; i++) {
      if(p.doctor_list[i] == doctor_id)
      {
        pos=i;
        break;
      }
    }

    for(;pos<pdlength-1;pos++)
    {
      p.doctor_list[pos]= p.doctor_list[pos+1];
    }

    p.doctor_list.pop();

    pdlength= (uint16)(d.patient_list.length);
    pos=0;

    for (uint16 i = 0; i < pdlength; i++) {
      if(d.patient_list[i] == msg.sender)
      {
        pos=i;
        break;
      }
    }

    for(;pos<pdlength-1;pos++)
    {
      d.patient_list[pos]= d.patient_list[pos+1];
    }
    d.patient_list.pop();

    emit revokeDoctorAccess(msg.sender, "Revoked access of doctor", d.name, doctor_id);
  }
}

    


