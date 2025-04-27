import axios from "./axiosSets";

export const getTracks = async (query) => {
  let url = "";
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      url+=`&${key}=${query[key]}`
    }
  });
  const res = await axios.get(`tracks?limit=12${url}`);
  console.log(res);

  return res.data;
};
