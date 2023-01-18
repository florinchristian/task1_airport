import axios from "axios";
import {HOST, airplanesPath} from "./paths";

const browseAirplanes = async () => {
    const result = await axios.get(`${HOST}/${airplanesPath}`);

    return result.data;
}

export default browseAirplanes;