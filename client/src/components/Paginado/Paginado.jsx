import React from "react";
import "./paginado.css"

export default function Paginado ({countriesPerPage, countires, paginado}){
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(countires/countriesPerPage); i++) {
        pageNumber.push(i)   
    }

    return (
        <nav className="nav-paginado">
            <ul className="ul-paginado">
                {pageNumber && pageNumber.map(number => {
                    return (
                    <li className="li-paginado" key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}