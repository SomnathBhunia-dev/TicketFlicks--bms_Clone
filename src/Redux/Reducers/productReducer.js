const initialState = {
    Data: [],
    Product: [],
    Loading: true
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                Data: action.payload,
                Product: action.payload[0]?.MovieList
            }
        case "LOADING":
            return {
                ...state,
                Loading: action.payload
            }

        default:
            return state;
    }
}

export default productReducer