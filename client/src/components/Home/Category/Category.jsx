import "./Category.scss";
import {FaTheaterMasks} from "react-icons/fa";
import {SiHiveBlockchain} from "react-icons/si";
import {GoChecklist} from "react-icons/go";
const Category = () => {

    return (
        <div className="shop-by-category">
            <div className="categories">
                <div className="category">
                    <div className="icon"><FaTheaterMasks size={90}></FaTheaterMasks></div>
                    <h5 className="text">Anonymous Records</h5>
                    <p className="text-p">Your Medical Data can't be tracked to your identity</p>
                </div>
                <div className="category">
                <div className="icon"><SiHiveBlockchain size={90}></SiHiveBlockchain></div>
                    <h5 className="text">Decentralized Platform</h5>
                    <p className="text-p">To aid in managing patient reports and provide seamless</p>
                </div>
                <div className="category">
                <div className="icon"><GoChecklist size={90} color="black"></GoChecklist></div>
                    <h5 className="text">Easy Appointments</h5>
                    <p className="text-p">Can be taken from doctors in just a click.</p>
                </div>
            </div>
        </div>);
};

export default Category;
