import axios from "axios";
import {HOST, flightsPath} from "./paths";

const browseFlights = async flight => {
    console.log(flight);

    const result = await axios.get(`${HOST}/${flightsPath}`, {
        params: flight
    });

    return result.data;
};

export default browseFlights;