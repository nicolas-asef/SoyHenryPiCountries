import { Link } from "react-router-dom"
import "./cards.css"

export default function Cards (country){
    let { name, bandera, continente, capital, subRegion, area, poblacion, id } = country.country
    return (
        <article className="article-card">
            <h2>{name}</h2>
            <img src={bandera} alt="" className="img-bandera"/>
            <h2>{continente}</h2>
            {/* <h2>{capital}</h2>
            <h2>{subRegion}</h2>
            <h2>{area}</h2>
            <h2>{poblacion}</h2> */}
            <Link to={`/detalle/${id}`}>
                <button> INFO </button>
            </Link>
        </article>
    )
}