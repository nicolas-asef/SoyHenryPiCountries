import axios from "axios"

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_DETAIL = 'GET_DETAIL'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'

export function getAllCountries () {
    return function (dispatch){
        fetch ("http://localhost:3001/countries")
            .then (resp => resp.json())
            .then (countries => dispatch({type: GET_ALL_COUNTRIES, payload: countries}))
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

export function filterByContinent(contient){
    return function (dispatch){
        return dispatch ({type: FILTER_BY_CONTINENT, payload: contient})
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