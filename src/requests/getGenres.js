import axios from "./axiosSets";

export const getGenges = async () => {
    const res = await axios.get("genres")
    return res.data
};
