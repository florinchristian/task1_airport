import axios from "axios";
import {HOST, authPath} from "./paths";

const registerUser = async (email, password) => {
    const result = await axios.post(`${HOST}/${authPath}`, {
        email,
        password
    });

    return result.data;
};

export default registerUser;