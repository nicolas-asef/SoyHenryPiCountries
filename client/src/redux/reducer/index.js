const initialState = {
    countries : [],
    allCountries: [],
    detail:[],
    activity: [],
    continent: []
    
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ALL_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries : action.payload,
                continent: action.payload
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

        case "GET_ACTIVITY":
            return {
                ...state,
                activity: action.payload
            }
            
            case "FILTER":
                return {
                    ...state,
                    countries: action.payload
                }
                
        default : return {...state}
    }

}

export default rootReducer;