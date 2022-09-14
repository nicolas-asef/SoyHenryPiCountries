import { Link } from "react-router-dom";
import moduleStyle from "./Landing.module.css"
import image from "../../images/landingPag.jpg"

export default function Landing(){
    return (
        <div className={moduleStyle.conteiner}>
            <div className={moduleStyle.opacity}>
                <div className={moduleStyle.divH1}>
                    <h1 className={moduleStyle.h1}>NEXT DESTINY</h1>
                </div>
                <div className={moduleStyle.divH2}>
                    <h2 className={moduleStyle.h2}><i>Encontra tu próximo destino</i></h2>
                </div>
                <Link to="/home" className={moduleStyle.linkBtn}>
                    <button className={moduleStyle.btn}>Ingesar</button>
                </Link>
            </div>
        </div>
    )
}