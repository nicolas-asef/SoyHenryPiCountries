import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moduleStyle from "./Search.module.css"

import { getCountry } from "../../redux/actions"


export default function Search({paginado}){

    const [input, setInput] = useState ("")
    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getCountry(input))
        paginado(1)
    }
    return (
        <form onSubmit={onSubmit} className={moduleStyle.search}>
                <label className={moduleStyle.label}></label>
                <p className={moduleStyle.p}>Buscar Pais</p>
                <input type="text" onChange={onChange} className={moduleStyle.input}/>
        </form>
    )
}