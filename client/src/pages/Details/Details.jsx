import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Cards from "../../components/Cards/Cards"
import CardDetail from "../../components/Detail/CardDetail"
import { getDetail } from "../../redux/actions"


export default function (){

    let {id} = useParams()
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(id))
    },[dispatch])

    return (
        <div>
            <h1>Detalles</h1>
            {
                detail.length <= 0 ? "Cargando..." : 
                <CardDetail 
                name= {detail.name}
                bandera = {detail.bandera}
                continente = {detail.continente}
                />
            }
        </div>
    )
}