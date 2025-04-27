import axios from "./axiosSets";

export const createTrack = async (data) => {
    const res = await axios.post("tracks", data)
    return res.data
};
