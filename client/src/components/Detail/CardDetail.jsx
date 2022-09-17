import moduleStyles from "./CardDetail.module.css"


export default function CardDetail (detail){
    let detalles = detail.detail
    return (
        <div>
            <div className={moduleStyles.tarjeta}>
                <div className={moduleStyles.div1}>
                    <div className={moduleStyles.divNombre}>
                        <h1 className={moduleStyles.h1}>{detalles.name}</h1>
                        <h4 className={moduleStyles.h4}>ID : {detalles.id}</h4>
                    </div>
                    <div className={moduleStyles.divImg}>
                        <img src={detalles.bandera} className={moduleStyles.img}/>
                    </div>
                </div>
                <div className={moduleStyles.div2}>
                    <h3 className={moduleStyles.h3}>{detalles.name}, es un pais ubicado en {detalles.continente}, se encuentra en al sub Region de {detalles.subRegion}, su capital es {detalles.capital},
                    cuenta con una poblacion de {detalles.poblacion} habitantes y posee una superficie de {detalles.area} km cuadrados.</h3>
                </div>
                <div className={moduleStyles.div3}>
                    {
                        detalles.Actividads.length === 0 ? "No hay actividades cargadas" : detalles.Actividads.map( el => {
                            return (
                                <div className={moduleStyles.contenedor}>
                                    <h2>{el.nombre}</h2>
                                    <h5>Duracion: {el.duracion}</h5>
                                    <h5>Dificultad: {el.dificultad}</h5>
                                    <h5>Temporada: {el.temporada}</h5>
                                 </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}