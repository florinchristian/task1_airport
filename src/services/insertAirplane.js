import axios from "axios";
import {HOST, airplanesPath} from "./paths";

const insertAirplane = async (name, rowNumber, columnNumber) => {
    const result = await axios.post(`${HOST}/${airplanesPath}`, {
        name,
        rowNumber,
        columnNumber
    });

    return result.data;
}

export default insertAirplane;