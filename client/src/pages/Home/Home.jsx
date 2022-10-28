import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getActivity, getAllCountries } from "../../redux/actions"
import Paginado from "../../components/Paginado/Paginado"
import Cards from "../../components/Cards/Cards"
import moduleStyale from "./Home.module.css"
import Search from "../../components/Search/Search"
import Nav from "../../components/Nav/Nav"
import Filters from "../../components/Filters/Filters"
import Banner from "../../components/Banner/Banner"

export default function Home (){

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const [actualizar, setActualizar] = useState (true)
    const [page, setPage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(10)
    const indexOfLastCountry = page * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries= countries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setPage(pageNumber)
    }

    const render = () => {
        setActualizar(actualizar === true ? false : true);
        console.log(actualizar)
    }

    useEffect(async ()=> {
        dispatch(getAllCountries())
        dispatch(getActivity())
    },[])

    return (
        <div>
            <Nav />
            <Banner />
            <div className={moduleStyale.search}>
                <Search paginado={paginado} />
            </div>
            <div>
                <Filters countries={countries} callbk={render} paginado={paginado}/>
            </div>
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