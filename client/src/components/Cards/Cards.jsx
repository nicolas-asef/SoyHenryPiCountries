import { Link } from "react-router-dom"
import moduleStyle from "./Card.module.css"

export default function Cards (country){
    let { name, bandera, continente, capital, subRegion, area, poblacion, id } = country.country
    return (
        <article className={moduleStyle.aricle}>
            <div className={moduleStyle.divTitle}>
                <h2 className={moduleStyle.title}>{name}</h2>
            </div>
            <div className={moduleStyle.divImg}>
                <img src={bandera} alt="" className={moduleStyle.img}/>
            </div>
            <div className={moduleStyle.divContinente}>
                <h2>{continente}</h2>
            </div>
            <div className={moduleStyle.divLink}>
                <Link to={`/detalle/${id}`} >
                    <button className={moduleStyle.btn}> Detalles </button>
                </Link>
            </div>
        </article>
    )
}