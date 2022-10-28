import { Link } from "react-router-dom"
import moduleStyle from "./Nav.module.css"
import nextDestiny from "../../images/NEXT_DESTINY.png"

export default function Nav ({page}){
    console.log(page)

    const colorH1 = () => {
        if (page === "activity") return moduleStyle.h1White
        else return moduleStyle.h1
    }

    const colorLink = () => {
        if (page === "activity") return moduleStyle.linkWhite
        else return moduleStyle.link
    }


    return (
        <nav className={moduleStyle.nav}>
            <div className={moduleStyle.divImg}>
                <Link to="/" className={moduleStyle.link}>
                    <h1 className={colorH1()}>NEXT DESTINY</h1>
                </Link>
            </div>
            <div className={moduleStyle.divLink}>
                <Link to='/home' className={colorLink()}>Home</Link>
                <Link to='/actividad' className={colorLink()}>Actividad</Link>
            </div>
        </nav>
    )
}