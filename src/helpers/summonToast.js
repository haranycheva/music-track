import toast from "react-hot-toast";

export const summonToast = (asyncFn, params, text) => {
  return toast
    .promise(asyncFn(...params), {
      loading: text.loading,
      success: <b>{text.success}</b>,
      error: <b>Something went wrong...</b>,
    })
};
