import React, { useState, useEffect, useRef } from "react";
import { Nota } from "./Nota";

export function ListaNotas() {
    const [notas, setNotas] = useState(() => {
        try {
            const notasGuardadas = localStorage.getItem("notas_stickers");
            if (notasGuardadas) {
                return JSON.parse(notasGuardadas);
            }
            return [
                {
                    id: 1,
                    titulo: "Regar las plantas",
                    descripcion: "Día por medio.",
                    importante: true
                },
                {
                    id: 2,
                    titulo: "Subir las notas",
                    descripcion: "Antes de fin de semestre.",
                    importante: false
                },
                {
                    id: 3,
                    titulo: "Renovar Tarjeta",
                    descripcion: "Antes de fin de mes.",
                    importante: false
                }
            ];
        } catch (error) {
            return [];
        }
    });

    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();

    useEffect(() => {
        localStorage.setItem("notas_stickers", JSON.stringify(notas));
    }, [notas]);

    const agregarNota = (e) => {
        e.preventDefault();

        if (descripcionRef.current.value.trim() === "") {
            alert("La descripción es obligatoria");
            return;
        }

        const nuevaNota = {
            id: Date.now(),
            titulo: tituloRef.current.value.trim(),
            descripcion: descripcionRef.current.value.trim(),
            importante: importanteRef.current.checked,
        };

        setNotas((notasAnteriores) => [...notasAnteriores, nuevaNota]);

        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
    };

    const eliminarNota = (id) => {
        setNotas((notasAnteriores) =>
            notasAnteriores.filter((nota) => nota.id !== id)
        );
    };

    return (
        <div className="container">
            
            <form onSubmit={agregarNota} className="formulario-lineal">
                
                {/* LÍNEA 1: Título principal centrado adentro del bloque translúcido */}
                <h1 className="black-ops-one-regular">
                    Notas Organizadoras
                </h1>

                {/* LÍNEA 2: Inputs alineados en fila horizontal */}
                <div className="formulario-controles">
                    <input
                        ref={tituloRef}
                        type="text"
                        className="input-lineal"
                        placeholder="Título"
                    />

                    <input
                        ref={descripcionRef}
                        type="text"
                        className="input-lineal"
                        placeholder="Descripción"
                    />

                    <label className="checkbox-lineal">
                        <input
                            ref={importanteRef}
                            type="checkbox"
                        />
                        ¡Importante!
                    </label>

                    <button type="submit" className="btn-agregar-lineal">
                        Agregar
                    </button>
                </div>
                
            </form>

            <div className="pizarra-corcho">
                <div className="notas-grid">
                    {notas.map((item, index) => (
                        <Nota
                            key={item.id}
                            id={item.id}
                            index={index}
                            titulo={item.titulo}
                            descripcion={item.descripcion}
                            importante={item.importante}
                            onEliminar={eliminarNota}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}