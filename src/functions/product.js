import axios from "axios";

//product create function
//need to be admin to post product
//got values and header auth token productcreate component
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
