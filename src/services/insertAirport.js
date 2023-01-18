import axios from "axios";
import {HOST, airportsPath} from "./paths";

const insertAirport = async (name, country, county, street) => {
    const result = await axios.post(`${HOST}/${airportsPath}`, {
        name,
        country,
        county,
        street
    });

    return result.data;
};

export default insertAirport;