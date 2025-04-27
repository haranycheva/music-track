import axios from "./axiosSets";

export const deleteTrack = async (id) => {
    const res = await axios.delete(`tracks/${id}`)
    return res.data
};
