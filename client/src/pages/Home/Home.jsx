import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filter, getActivity, getAllCountries, orderByNames, orderByPoblacion } from "../../redux/actions"
import Paginado from "../../components/Paginado/Paginado"
import Cards from "../../components/Cards/Cards"
import moduleStyale from "./Home.module.css"
import Search from "../../components/Search/Search"
import Nav from "../../components/Nav/Nav"

export default function Home (){

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const filtrado = useSelector(state => state.allCountries)
    const activity = useSelector(state => state.activity)
    const [continente, setContiente] = useState ("All")
    const [actividad, setActividad] = useState ("select")
    const [order, setOrder] = useState('')
    const [page, setPage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(10)
    const indexOfLastCountry = page * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries= countries.slice(indexOfFirstCountry, indexOfLastCountry)
    console.log(countries)


    const paginado = (pageNumber) => {
        setPage(pageNumber)
    }

    const orderBy = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "select"){
            return
        }
        else if (e.target.value === "asc" || e.target.value === "des"){
            dispatch(orderByNames(countries, e.target.value))
        }
        else{
            dispatch(orderByPoblacion(countries, e.target.value))
        }
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }
    const filtByContinent = (e) => {
        
        console.log(e.target.value)
        setContiente(e.target.value)
        dispatch(filter(filtrado ,e.target.value, actividad))
        setPage(1)
    }

    const filterByActivity = (e) => {
        e.preventDefault()
        setActividad(e.target.value)
        dispatch(filter(filtrado , continente, e.target.value))
    }
    

    useEffect(async ()=> {
        dispatch(getAllCountries())
        dispatch(getActivity())
    },[])



    return (
        <div>
            <Nav />
            <div className={moduleStyale.banner}>
                <h1 className={moduleStyale.h1Banner}>NEXT DESTINY</h1>
                <div className={moduleStyale.divH3}>
                    <h3 className={moduleStyale.h3Banner}>
                        Encuentra tu próximo destino
                    </h3>
                </div>
            </div>
            <div className={moduleStyale.search}>
                <Search/>
            </div>
            <select onChange={e => filtByContinent(e)}>
                <option value="All">Todos</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antártida</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>
            <select onChange={e => orderBy(e)}>
                <option value="select">Seleccionar</option>
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
                <option value="may">Mayor Poblacion</option>
                <option value="men">Menor Poblacion</option>
            </select>
            <select onChange={e => filterByActivity(e)}>
                <option value="select">Seleccionar</option>
                {activity.length > 0 && activity.map (activity => {
                    return (
                        <option value={activity.id} key={activity.id}>{activity.nombre}</option>
                    )
                })}
            </select>
            <div className={moduleStyale.divPaises}>
                <div className={moduleStyale.divHome}>
                    {
                        currentCountries.length <= 0 ? <h2>No se han encontrados paises que coincidan con esa busqueda</h2>: currentCountries.map( country => {
                            return (
                                <Cards key={country.id}
                                    country={country}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <Paginado 
                countriesPerPage={countriesPerPage}
                countires={countries.length}
                paginado={paginado} 
            />
    </div>
)}