import axios from "axios";
import {HOST, authPath} from "./paths";

const loginUser = async (email, password) => {
    const result = await axios.get(`${HOST}/${authPath}`, {
        params: {
            email,
            password
        }
    });

    return result.data;
};

export default loginUser;