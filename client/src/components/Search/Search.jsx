import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getCountry } from "../../redux/actions"


export default function Search(search){

    const [input, setInput] = useState ("")
    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getCountry(input))
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Buscar Pais..." onChange={onChange} />
            <button>Buscar</button>
        </form>
    )
}