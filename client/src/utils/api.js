import axios from "axios";
export const fetchDataFromApi = async (url)=>{
    try {
        const { data } = await axios.get(process.env.REACT_APP_DEV_URL + url);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }

};
export const postApi = async (url)=>{
    axios.post(`http://localhost:3080/${url}`).then(res=>console.log("Reg success")).catch(err=>console.log(err));
}