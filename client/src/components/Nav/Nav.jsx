import { Link } from "react-router-dom"
import moduleStyle from "./Nav.module.css"
import nextDestiny from "../../images/NEXT_DESTINY.png"

export default function Nav (){
    return (

        <nav className={moduleStyle.nav}>
            <div className={moduleStyle.divImg}>
                <Link to="/">
                    <img src={nextDestiny} alt="logo next-destiny" className={moduleStyle.img}/>
                </Link>
            </div>
            <div className={moduleStyle.divLink}>
                <Link to='/home' className={moduleStyle.link}>Home</Link>
                <Link to='/actividad' className={moduleStyle.link}>Actividad</Link>
            </div>
        </nav>
    )
}