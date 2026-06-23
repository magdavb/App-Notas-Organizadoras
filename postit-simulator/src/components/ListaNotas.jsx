import React, { Fragment, useEffect, useRef, useState } from "react";
import { Nota } from "./Nota";
import { v4 as uuid_v4 } from "uuid";

export function ListaNotas() {

    const [notas, setNotas] = useState([]);

    const CLAVE = "postit-notas";

    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();

    // Leer LocalStorage
    useEffect(() => {

        const notasStorage =
            JSON.parse(localStorage.getItem(CLAVE)) || [];

        setNotas(notasStorage);

    }, []);

    // Guardar LocalStorage
    useEffect(() => {

        localStorage.setItem(
            CLAVE,
            JSON.stringify(notas)
        );

    }, [notas]);

    const agregarNota = () => {

        const titulo =
            tituloRef.current.value;

        const descripcion =
            descripcionRef.current.value;

        const importante =
            importanteRef.current.checked;

        if (descripcion.trim() === "") {
            alert("La descripción es obligatoria");
            return;
        }

        const nuevaNota = {
            id: uuid_v4(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante
        };

        setNotas((notasAnteriores) => {
            return [...notasAnteriores, nuevaNota];
        });

        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
    };

    const eliminarNota = (id) => {

        const nuevasNotas =
            notas.filter(
                (nota) => nota.id !== id
            );

        setNotas(nuevasNotas);
    };

    return (
        <Fragment>

            <div className="contenedor">

                <div className="formulario">

                    <h2>Post It Simulator!</h2>

                    <input
                        ref={tituloRef}
                        type="text"
                        placeholder="Título"
                    />

                    <textarea
                        ref={descripcionRef}
                        placeholder="Descripción"
                    ></textarea>

                    <label>
                        <input
                            ref={importanteRef}
                            type="checkbox"
                        />
                        Importante
                    </label>

                    <button
                        onClick={agregarNota}
                    >
                        AGREGAR
                    </button>

                </div>

                <div className="grid-notas">

                    {
                        notas.map((item) =>
                            <Nota
                                key={item.id}
                                id={item.id}
                                titulo={item.titulo}
                                descripcion={item.descripcion}
                                importante={item.importante}
                                eliminarNota={eliminarNota}
                            />
                        )
                    }

                </div>

            </div>

        </Fragment>
    );
}