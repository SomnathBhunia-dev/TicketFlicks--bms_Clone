import { combineReducers } from "redux";
import cartReducer from './cartReducer'
import filterReducer from './filterReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
    Cart: cartReducer,
    Filter: filterReducer,
    Product: productReducer
})

export default rootReducer;