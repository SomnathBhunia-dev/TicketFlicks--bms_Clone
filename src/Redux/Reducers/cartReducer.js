const initialState = {
    Cart: {},
    Fee: 49,
    CartTotal: 0,
    Booking: [],
    Profile: {},
    statusDial: false,
    statusDialMsg: ''
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                Cart: action.payload
            }
        case "SEAT_ADD_TO_CART":
            return {
                ...state,
                Cart: { ...state.Cart, SeatDetails: action.payload, }
            }
        case "CART_UPDATE":
            const Total = state.Cart.SeatDetails?.reduce((total, i) => total + i.Price * i.Seat.length, 0) + state.Fee
            return {
                ...state,
                CartTotal: Total
            }
        case "CHANGE_SLOT":
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    ChooseTime: action.payload
                }
            }
        case 'SET_TXN_STATUS':
            return {
                ...state,
                Booking: action.payload.Item,
                statusDial: true,
                statusDialMsg: action.payload.Msg,
            }
        case "REMOVE_TXN_STATUS":
            return {
                ...state,
                Cart: {},
                statusDial: false,
            }
        case "ADD_PROFILE":
            return {
                ...state,
                Profile: action.payload
            }
        default:
            return state;
    }
};


export default cartReducer