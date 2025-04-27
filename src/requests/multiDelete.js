import axios from "./axiosSets";

export const multiDelete = async (ids) => {
    console.log(ids);
    
    const res = await axios.post(`tracks/delete`, {ids})
    return res.data
};
