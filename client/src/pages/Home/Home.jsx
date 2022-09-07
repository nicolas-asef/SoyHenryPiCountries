import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByContinent, getAllCountries, orderByNames, orderByPoblacion } from "../../redux/actions"
import Paginado from "../../components/Paginado/Paginado"
import Cards from "../../components/Cards/Cards"
import "./home.css"
import Search from "../../components/Search/Search"

export default function Home (){

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const [order, setOrder] = useState('')
    const [page, setPage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(10)
    const indexOfLastCountry = page * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries= countries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        console.log(pageNumber)
        setPage(pageNumber)
    }

    const filtByContinent = (e) => {
        console.log(e.target.value)
        dispatch(filterByContinent(e.target.value))
    }

    const orderByName = (e) => {
        e.preventDefault()
        dispatch(orderByNames(countries, e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    const orderByPob = (e) => {
        e.preventDefault()
        dispatch(orderByPoblacion(countries, e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    useEffect(async ()=> {
        dispatch(getAllCountries())
    },[])


    return (
        <div>
            <h1>HOME</h1>
            <Search />
            <select onChange={e => filtByContinent(e)}>
                <option value="All">Todos</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antártida</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>
            <select onChange={e => orderByName(e)}>
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <select onChange={e => orderByPob(e)}>
                <option value="may">Mayor Poblacion</option>
                <option value="men">Menor Poblacion</option>
            </select>
            <Paginado 
            countriesPerPage={countriesPerPage}
            countires={countries.length}
            paginado={paginado} 
            />
            <div className="div-home">
                {
                    currentCountries.length <= 0 ? "loading..." : currentCountries.map( country => {
                        return (
                            <Cards key={country.id}
                                country={country}
                            />
                        )
                    })
                }
            </div>


        </div>
    )
}