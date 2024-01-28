export const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                Data: action.payload,
                Filtered: action.payload.MovieList,
                Product: action.payload.MovieList
            }
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
        case "FILTER_TAG":
            const { Name, value, isChecked } = action.payload;
            // Create a new object for FilterBy to ensure immutability
            const updatedFilterBy = {
                ...state.FilterBy,
                [Name]: isChecked
                    ? [...(state.FilterBy[Name] || []), value]
                    : (state.FilterBy[Name] || []).filter((val) => val !== value),
            };

            // Return the updated state object
            return {
                ...state,
                FilterBy: updatedFilterBy,
            };
        case "UPDATE_FILTER_PRODUCT":
            let tempFilter = [...state.Product]
            const { Format, Genres, Languages } = action.payload
            const filtering = (filterKey) => {
                tempFilter = tempFilter.filter((item) =>
                    action.payload[filterKey].some((e) => item.analytics[filterKey].includes(e))
                );
            };

            if (Format.length > 0) {
                filtering('Format')
            }
            if (Genres.length > 0) {
                filtering('Genres')
            }
            if (Languages.length > 0) {
                filtering('Languages')
            }
            return {
                ...state,
                Filtered: tempFilter
            }
            case "ADD_PROFILE":
                return{
                    ...state,
                    Profile: action.payload
                }
        default:
            return state
    }
}