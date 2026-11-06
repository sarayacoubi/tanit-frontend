import { HANDELEERROR, CLEARERROR } from "../ActionsTypes/ErrorsTypes";

export const handleError = (msg) => (dispatch) => {
  var id = Math.random();

  dispatch({
    type: HANDELEERROR,
    payload: { msg, id },
  });

  setTimeout(() => {
    dispatch({
      type: CLEARERROR,
      payload: id,
    });
  }, 3000);
};
