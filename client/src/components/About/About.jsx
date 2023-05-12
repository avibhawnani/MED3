import "./About.scss";
import linksimg from "../../assets/links-img.svg";
const About = ()=>{
return(
    <>
    <div className="image">
        <img className="image-bn" src={linksimg} alt="" srcset="" />
    </div>
    <p className="content">
Welcome to our EHR (Electronic Health Record) system that is built using Blockchain technology. Our platform leverages the security and transparency of Blockchain to create a reliable and secure digital medical records management system.

In our system, patients can store their health records securely in a decentralized and tamper-proof manner, with complete control over who has access to their information. With the use of Blockchain, our EHR system ensures that the data is tamper-proof, immutable, and transparent, thereby reducing the risk of data breaches, fraud, and medical errors. <br></br>

Our platform provides healthcare providers with access to real-time patient data, enabling them to make better and faster treatment decisions. This not only improves patient outcomes but also helps to reduce healthcare costs and improve overall quality of care.

We take privacy seriously, and our system is designed to comply with regulatory requirements, such as HIPAA, GDPR, and other data protection regulations.<br></br>

At our core, we believe that Blockchain technology can revolutionize the healthcare industry by providing a secure, transparent, and decentralized system for managing health records. Our EHR system is a step in that direction, providing patients and healthcare providers with a reliable and secure platform for managing health data.</p>
    </>
);
}
export default About;