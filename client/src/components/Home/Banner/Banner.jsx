import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.svg";
const Banner = () => {
    return ( <div className="hero-banner">
        <div className="content">
            <div className="text-content">
                <h1>SAFE</h1>
                <p>Protecting your privacy is our top priority. Rest assured that your medical records are stored securely and kept confidential at all times.</p>
                <div className="ctas">
                    <div className="banner-cta">Read More</div>
                    <div className="banner-cta v2">Book Demo Now</div>
                </div>
            </div>
            <img className="banner-img" src={BannerImg} alt="headphone img"/>
        </div>
    </div>);
};

export default Banner;
