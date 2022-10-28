import styled from "./Banner.module.css"

export default function Banner (){
    return (
        <div className={styled.banner}>
            <h1 className={styled.h1Banner}>NEXT DESTINY</h1>
                <div className={styled.divH3}>
                    <h3 className={styled.h3Banner}>
                    Encuentra tu próximo destino
                    </h3>
                </div>
        </div>
    )
}