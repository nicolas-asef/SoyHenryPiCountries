import axios from "axios"

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_DETAIL = 'GET_DETAIL'
export const FILTER = 'FILTER'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const GET_NAMES = "GET_NAMES"
export const GET_ACTIVITY = "GET_ACTIVITY"

export function getAllCountries () {
    return async function (dispatch){
        try {
            let countries = await axios.get ("http://localhost:3001/countries")
            return (dispatch({type: GET_ALL_COUNTRIES, payload: countries.data}))
        } catch (error) {
            console.log(error)
        }
    }
};

export function getCountry(name){
    return async function(dispatch){
        try {
            let country = await axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch (({type: GET_COUNTRY, payload: country.data}))
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let detail = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({type: GET_DETAIL, payload: detail.data})
        } catch (error) {
            console.log(error)
        }

    }
}
export function orderByNames(countries, order){

    function orderByName( a, b )
        {
        if ( a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        }
        if ( a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
        }
        return 0;
        }
    if (order === 'asc'){
        countries.sort(orderByName);
    }
    if (order === 'des'){
        countries.sort(orderByName).reverse()
    }
    return function (dispatch){
        dispatch({type: ORDER_BY_NAME, payload: countries})
    }
}
export function orderByPoblacion(countries, order){

    console.log(order)
    function orderByPob( a, b ){
        if ( a.poblacion < b.poblacion){
            return 1;
        }
        if ( a.poblacion > b.poblacion){
            return -1;
        }
        return 0;
    }
    if (order === 'may'){
        countries.sort(orderByPob);
    }
    if (order === 'men'){
        countries.sort(orderByPob).reverse()
    }
    return function (dispatch){
        dispatch({type: ORDER_BY_POPULATION, payload: countries})
    }
    
}

export function filter(countries ,contient, actividad){
    console.log(countries, contient, actividad)
    let filtrado = []
    if (contient === "All" && actividad === "select"){
        filtrado = countries
    }
    if (contient !== "All" && actividad === "select"){
        filtrado = countries.filter (el => el.continente === contient)
    }
    if (contient === "All" && actividad !== "select"){
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].Actividads.length > 0){
                console.log("ENTRO AL IFFFF")

                countries[i].Actividads.map(el => {
                    if (el.id === actividad){
                        filtrado.push(countries[i])
                    }
                })
            }
        }
    }
    if (contient !== "All" && actividad !== "select"){
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].Actividads.length >0){

                countries[i].Actividads.map(el => {
                    if (el.id === actividad && countries[i].continente === contient){
                        filtrado.push(countries[i])
                    }
                })
            }
            
        }
    }

    
    return function (dispatch){
        return dispatch ({type: FILTER, payload: filtrado})
    }

}



export function getActivity(){
    return async function(dispatch){
        try {
            let actity = await axios.get("http://localhost:3001/activities")
            return dispatch ({type:GET_ACTIVITY, payload: actity.data})
        } catch (error) {
            console.log(error)
        }
    }
}