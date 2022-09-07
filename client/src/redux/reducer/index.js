const initialState = {
    countries : [],
    allCountries: [],
    detail:[]
}

const rootReducer = (state = initialState, action) => {
        // console.log(action.payload[0].name)
    switch(action.type){
        case "GET_ALL_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries : action.payload
            }
        case "GET_COUNTRY":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            const contientFilter = action.payload === "All" ? allCountries : allCountries.filter(country => country.continente === action.payload)
            return {
                ...state,
                countries: contientFilter
            }
        case "ORDER_BY_NAME":
            return {
                ...state,
                countries: action.payload
            }
        case "ORDER_BY_POPULATION":
            return{
                ...state,
                countries: action.payload
            }
        default : return {...state}
    }

}

export default rootReducer;