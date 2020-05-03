import * as actionType from "./actionTypes"

export const clearingStage = (newData) => {
  return {
    type: actionType.CLEAR_STAGE,
    arr: newData
  }
}