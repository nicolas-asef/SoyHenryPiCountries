export default function CardDetail ({name, continente, bandera}){
    return (
        <div>
            <h1>{name}</h1>
            <img src={bandera} alt="" />
            <h5>{continente}</h5>
        </div>
    )
}