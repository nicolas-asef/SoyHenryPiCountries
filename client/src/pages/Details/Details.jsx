import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CardDetail from "../../components/Detail/CardDetail"
import { getDetail } from "../../redux/actions"
import Nav from "../../components/Nav/Nav"
import moduleStyle from "./Details.module.css"


export default function (){

    let {id} = useParams()
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(id))
    },[dispatch])
    console.log(detail)
    return (
        <div>
            <Nav />
            <div className={moduleStyle.contenedor}>
                {
                    detail.length <= 0 ? "Cargando..." : 
                    <CardDetail detail={detail}
                    key={detail.id}
                    />
                }
            </div>
        </div>
    )
}