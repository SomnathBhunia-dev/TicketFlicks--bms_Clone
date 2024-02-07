const FILTER_TAG = "FILTER_TAG";
const UPDATE_FILTER_PRODUCT = "UPDATE_FILTER_PRODUCT";
const SET_DATA = "SET_DATA";
const LOADING = "LOADING";
const CHANGE_SLOT = "CHANGE_SLOT";
const ADD_TO_CART = "ADD_TO_CART";
const SEAT_ADD_TO_CART = "SEAT_ADD_TO_CART";
const CART_UPDATE = "CART_UPDATE";
const SET_TXN_STATUS = "SET_TXN_STATUS";
const REMOVE_TXN_STATUS = "REMOVE_TXN_STATUS";
const ADD_PROFILE = "ADD_PROFILE";

export const FilterTag = (Name, value, isChecked) => ({
  type: FILTER_TAG,
  payload: { Name, value, isChecked }
})

export const updateFilterProduct = (i) => ({
  type: UPDATE_FILTER_PRODUCT,
  payload: i
})
export const setData = (i) => ({
  type: SET_DATA,
  payload: i
})
export const loadingState = (i) => ({
  type: LOADING,
  payload: i
})
export const toggleSlot = (i) => ({
  type: CHANGE_SLOT,
  payload: i
})

export const addToCart = (i) => ({
  type: ADD_TO_CART,
  payload: i
})

export const SeataddToCart = (i) => ({
  type: SEAT_ADD_TO_CART,
  payload: i
})

export const cartUpdate = () => ({
  type: CART_UPDATE
})

export const txnUpdate = (i, msg)=>({ 
  type: SET_TXN_STATUS, 
  payload: { Item: i, Msg: msg } })

export const txnClear = () => ({
  type: REMOVE_TXN_STATUS
});

export const saveProfile = (i) => ({
  type: ADD_PROFILE,
  payload: i
});