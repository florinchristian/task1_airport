import axios from "axios";
import {HOST, airportsPath} from "./paths";

const browseAirports = async searchTerm => {
    const result = await axios.get(`${HOST}/${airportsPath}`, {
        params: {
            searchTerm
        }
    });

    return result.data;
};

export default browseAirports;