const initialState = {
  Filtered: [],
  FilterBy: {
      Format: [],
      Genres: [],
      Languages: []
  },
};
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
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
      let tempFilter = action.payload
      const { Format, Genres, Languages } = state.FilterBy
      const filtering = (filterKey) => {
        tempFilter = tempFilter.filter((item) =>
        state.FilterBy[filterKey].some((e) => item.analytics[filterKey].includes(e))
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
    default:
      return state;
  }
};

export default filterReducer