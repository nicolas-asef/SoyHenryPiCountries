import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries } from "../../redux/actions"

export function validate (input){
    let error = {}
    if (!input.nombre) error.nombre = 'Campo requerido'
    else if(!/(?!.*[\.\-\_]{2,})^[a-zA-Z \.\-\_]{3,35}$/.test(input.nombre)){
        error.nombre = "Debe tener entre 3 y 35 caracteres y contener solo letras"
    }
    if (!input.dificultad) error.dificultad = 'Campo requerido'
    if (!input.duracion) error.duracion = 'Campo requerido'
    else if(!/^(((0|1)[0-9])|2[0-3]):[0-5][0-9]$/.test(input.duracion)){
        error.duracion = "Valores entre 00:00 y 23:59"
    }
    if (!input.temporada) error.temporada = 'Campo requerido'
    else if (input.temporada === "seleccionar") error.temporada = 'Campo requerido'
    if (input.paises.length === 0) error.paises = 'Campo requerido'
    else if (input.paises === "seleccionar") error.paises = 'Campo requerido'
    return error
}


export default function Activity (){

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)


    const [input, setInput] = useState({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        paises:[]
    })
    
    const [error, setError] = useState ({})
    const [selectPais, setSelectPais] = useState("")


    const handleInputChange = (e) => {
        console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handlePaisesChange = (e) => {
        e.preventDefault()
        let find = input.paises.find(el => el === selectPais)
        if (selectPais === "seleccionar" || selectPais === "" || find !== undefined) return
        setInput((prevState) => ({
            ...prevState,
            paises : [...input.paises, selectPais]
        }))
        setError(validate({
            ...input,
            [e.target.name] : [...input.paises, e.target.value]
        }))
    }

    console.log(input)

    const selectPaisClick = (e) => {
        setSelectPais(e.target.value)
    } 

    const eliminarPais = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        let filter = input.paises.filter(pais => pais !== e.target.value)
        console.log(filter)
        setInput({
            ...input,
            [e.target.name] : filter
        })
    }

    const manejarEnvio = async(e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/activities', input)
        alert("Formulario ENVIADO")
        setInput({
            nombre:"",
            dificultad:"",
            duracion:"",
            temporada:"",
            paises:[]
        })
    }

    useEffect(()=> {
        dispatch(getAllCountries())
    },[dispatch])

    return (
        <form onSubmit={manejarEnvio}>
            <div>
                <label>Nombre: </label>
                <input type="text" name="nombre" value={input.nombre} onChange={handleInputChange} />
                {error.nombre && <p>{error.nombre}</p>}
            </div>
            <div>
                <label>Dificultad: </label>
                <input type="radio" name="dificultad" value={1} onChange={handleInputChange}/> 1
                <input type="radio" name="dificultad" value={2} onChange={handleInputChange}/> 2
                <input type="radio" name="dificultad" value={3} onChange={handleInputChange}/> 3
                <input type="radio" name="dificultad" value={4} onChange={handleInputChange}/> 4
                <input type="radio" name="dificultad" value={5} onChange={handleInputChange}/> 5
            
                {error.dificultad && <p>{error.dificultad}</p>}
            </div>
            <div>
                <label>Duracion: </label>
                <input type="text" name="duracion"  value={input.duracion} onChange={handleInputChange}/>
                {error.duracion && <p>{error.duracion}</p>}
            </div>
            <div>
                <label>Temporada: </label>
                <select name="temporada"  value={input.temporada} onChange={handleInputChange}>
                    <option value="seleccionar">Seleccionar</option>
                    <option value="verano">Verano</option>
                    <option value="otoño">Otoño</option>
                    <option value="primavera">Primavera</option>
                    <option value="invierno">Invierno</option>
                </select>
                {error.temporada && <p>{error.temporada}</p>}
            </div>
            <div>
                <label>Paises: </label>
                <select onChange={selectPaisClick}>
                    <option value="seleccionar">Seleccionar</option>
                    {
                        countries && countries.map(paises => (
                            <option value={paises.pais}>{paises.name}</option>
                         ))
                    }
                </select>
                <button onClick={handlePaisesChange} value={input.pais} name="paises"> añadir </button>
                {error.paises && <p>{error.paises}</p>}
                {input.paises && input.paises.map(pais => (
                    <div>
                        <p>{pais}</p>
                        <button onClick={eliminarPais} value={pais} name="paises">x</button>
                    </div>
                ))}
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}

