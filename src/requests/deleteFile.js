import axios from "./axiosSets";

export const deleteFile = async (id) => {
        const res = await axios.delete(`tracks/${id}/file`)
        return res.data
};
