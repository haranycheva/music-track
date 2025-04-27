import axios from "./axiosSets";

export const editTrack = async (id, track) => {
    const res = await axios.put(`tracks/${id}`, track)
    return res.data
};
