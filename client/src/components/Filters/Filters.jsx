import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filter, orderByNames, orderByPoblacion } from "../../redux/actions"
import style from "./Filters.module.css"

export default function Filters ({countries, callbk, paginado}) {
    console.log(paginado)

    const [continente, setContiente] = useState ("All")
    const [actividad, setActividad] = useState ("select")
    const filtrado = useSelector(state => state.allCountries)
    const activity = useSelector(state => state.activity)
    const [order, setOrder] = useState('')

    const dispatch = useDispatch()

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
        callbk()
        setOrder(`ordenado ${e.target.value}`)
        paginado(1)
    }
    const filtByContinent = (e) => {
        setContiente(e.target.value)
        dispatch(filter(filtrado ,e.target.value, actividad))
        callbk()
        paginado(1)
    }

    const filterByActivity = (e) => {
        e.preventDefault()
        setActividad(e.target.value)
        dispatch(filter(filtrado , continente, e.target.value))
        paginado(1)
    }
    

    return (
        <div className={style.filter}>
            <div className={style.divFilter}>
                <label className={style.label}>Filtrar por: </label>
                <select className={style.select} onChange={e => filtByContinent(e)}>
                    <option value="All">Continente</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Antarctic">Antártida</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <select className={style.select} onChange={e => filterByActivity(e)}>
                    <option value="select">Actividad</option>
                    {activity.length > 0 && activity.map (activity => {
                        return (
                            <option value={activity.id} key={activity.id}>{activity.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className={style.divFilter}>
                <label className={style.label}>Ordenar: </label>
                <select className={style.select} onChange={e => orderBy(e)}>
                    <option value="select">Seleccionar</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                    <option value="may">Mayor Poblacion</option>
                    <option value="men">Menor Poblacion</option>
                </select>
            </div>
        </div>

    )
}