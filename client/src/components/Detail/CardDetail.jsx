import moduleStyles from "./CardDetail.module.css"

export default function CardDetail ({name, continente, bandera}){
    return (
        <div className={moduleStyles.back}>
            <h1>{name}</h1>
            <img src={bandera} alt="" />
            <h5>{continente}</h5>
        </div>
    )
}