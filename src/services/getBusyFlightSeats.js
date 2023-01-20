import axios from "axios";
import {HOST, busySeatsPath} from "./paths";

const getBusyFlightSeats = async flightId => {
    const result = await axios.get(`${HOST}/${busySeatsPath}`, {
        params: {
            flightId
        }
    });

    return result.data;
};

export default getBusyFlightSeats;