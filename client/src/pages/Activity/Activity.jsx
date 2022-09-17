import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Nav from "../../components/Nav/Nav"
import { getAllCountries } from "../../redux/actions"
import moduleStyle from "./Activity.module.css"

export function validate (input){
    let error = {}
    if (!input.nombre) error.nombre = 'Campo requerido'
    else if(!/(?!.*[\.\-\_]{2,})^[a-zA-Z \.\-\_]{3,35}$/.test(input.nombre)){
        error.nombre = "Entre 3 y 35 caracteres y contener solo letras"
    }
    if (!input.dificultad) error.dificultad = 'Campo requerido'
    else if (input.dificultad === "seleccionar") error.dificultad = 'Campo requerido'
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
    
    const [error, setError] = useState ({1: ''})
    const [selectPais, setSelectPais] = useState("")


    const handleInputChange = (e) => {
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
        console.log(Object.keys(error).length === 0)
        if (Object.keys(error).length === 0){
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
    }

    useEffect(()=> {
        dispatch(getAllCountries())
    },[dispatch])

    return (
        <div>
            <Nav />
            <div className={moduleStyle.formDiv}>
                <form onSubmit={manejarEnvio} className={moduleStyle.form}>
                    <div className={moduleStyle.divh1}>
                        <h1 className={moduleStyle.h1}>CREAR ACTIVIDAD</h1>
                    </div>
                    <div className={moduleStyle.divName}>
                        <label className={moduleStyle.label}>Nombre </label>
                        <div className={moduleStyle.divError}>
                            <input type="text" name="nombre" value={input.nombre} onChange={handleInputChange} className={moduleStyle.input}/>
                            {error.nombre && <p className={moduleStyle.error}>{error.nombre}</p>}
                        </div>
                    </div>
                    <div className={moduleStyle.divDificultad}>
                        <label className={moduleStyle.label}>Dificultad </label>
                        <div className={moduleStyle.divError}>
                            <select name="dificultad"  value={input.dificultad} onChange={handleInputChange} className={moduleStyle.select}>
                                <option value="seleccionar">Seleccionar</option>
                                <option value={1}>Muy facil</option>
                                <option value={2}>Facil</option>
                                <option value={3}>Media</option>
                                <option value={4}>Dificil</option>
                                <option value={5}>Muy Dificil</option>
                            </select>
                            {error.dificultad && <p className={moduleStyle.error}>{error.dificultad}</p>}
                        </div>
                    </div>
                    <div className={moduleStyle.divDuracion}>
                        <label className={moduleStyle.label}>Duracion </label>
                        <div className={moduleStyle.divError}>
                            <input type="text" name="duracion"  value={input.duracion} onChange={handleInputChange} className={moduleStyle.input}/>
                            {error.duracion && <p className={moduleStyle.error}>{error.duracion}</p>}
                        </div>
                    </div>
                    <div className={moduleStyle.divTemporada}>
                        <label className={moduleStyle.label}>Temporada </label>
                        <div className={moduleStyle.divError}>
                            <select name="temporada"  value={input.temporada} onChange={handleInputChange} className={moduleStyle.select}>
                                <option value="seleccionar">Seleccionar</option>
                                <option value="Verano">Verano</option>
                                <option value="Otoño">Otoño</option>
                                <option value="Primavera">Primavera</option>
                                <option value="Invierno">Invierno</option>
                            </select>
                            {error.temporada && <p className={moduleStyle.error}>{error.temporada}</p>}
                        </div>
                    </div>
                    <div className={moduleStyle.divPaises}>
                        <label className={moduleStyle.label}>Paises </label>
                        <div className={moduleStyle.divError}>
                            <select onChange={selectPaisClick} className={moduleStyle.select}>
                                <option value="seleccionar" default>Seleccionar</option>
                                {
                                    countries && countries.map(paises => (
                                        <option value={paises.pais}>{paises.name}</option>
                                    ))
                                }
                            </select>
                            <button onClick={handlePaisesChange} value={input.pais} name="paises" className={moduleStyle.btnAñadir}> ✓ </button>
                            {error.paises && <p className={moduleStyle.error}>{error.paises}</p>}
                        </div>
                        {input.paises && input.paises.map(pais => (
                            <div className={moduleStyle.divPaisSeleccionado}>
                                <p>{pais}</p>
                                <button onClick={eliminarPais} value={pais} name="paises" className={moduleStyle.btnX}>x</button>
                            </div>
                        ))}
                    </div>
                    <div className={moduleStyle.divPaisesSeleccionados}>

                    </div>
                    <div className={moduleStyle.divBtn}>
                        <button type="submit" className={moduleStyle.btn}>Enviar</button>
                    </div >
                </form>
            </div>
        </div>
)}

