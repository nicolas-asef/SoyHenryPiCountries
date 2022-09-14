import React from "react";
import moduleStyle from "./Paginado.module.css"

export default function Paginado ({countriesPerPage, countires, paginado}){

    const pageNumber = []
    for (let i = 1; i <= Math.ceil(countires/countriesPerPage); i++) {
        pageNumber.push(i)   
    }

    return (
        <nav className={moduleStyle.nav}>
            <ul className={moduleStyle.ul}>
                {pageNumber && pageNumber.map(number => {
                    return (
                    <li className={moduleStyle.li} key={number} onClick={()=> paginado(number)} >
                        <a className={moduleStyle.a}>{number}</a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}