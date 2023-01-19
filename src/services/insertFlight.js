import axios from "axios";
import {HOST, flightsPath} from "./paths";

const insertFlight = async flight => {
    const result = await axios.post(`${HOST}/${flightsPath}`, {
        airplane: flight['airplane'],
        fromAirport: flight['fromAirport'],
        toAirport: flight['toAirport'],
        startTime: flight['startTime'],
        endTime: flight['endTime'],
        price: flight['price']
    });

    return result.data;
};

export default insertFlight;