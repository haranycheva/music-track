import axios from "./axiosSets";

export const pushFile = async(id, data) => {
    const res = await axios.post(`tracks/${id}/upload`, data)
    return res.data
};
