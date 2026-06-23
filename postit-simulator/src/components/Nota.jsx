import React, { Fragment } from "react";

export function Nota(props) {
    return (
        <Fragment>
            <div className={props.importante ? "nota importante" : "nota"}>

                <button
                    className="btn-eliminar"
                    onClick={() => props.eliminarNota(props.id)}
                >
                    X
                </button>

                <h3>{props.titulo}</h3>

                <p>{props.descripcion}</p>

            </div>
        </Fragment>
    );
}