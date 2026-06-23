import React, { useRef } from "react";

export function Nota({ id, index, titulo, descripcion, importante, onEliminar }) {
    
    // Determinamos el ángulo fijo de 6 o -6 grados basándonos en el índice de la lista.
    // Notas pares (0, 2, 4...) van a 6° y las impares (1, 3, 5...) van a -6°.
    // Así garantizamos un patrón dinámico perfecto que nunca repite ángulos juntos.
    const anguloFijo = useRef((() => {
        return index % 2 === 0 ? 6 : -6;
    })());

    const estiloNota = {
        transform: `rotate(${anguloFijo.current}deg)`
    };

    return (
        <div 
            className={`nota-card ${importante ? "importante" : ""}`} 
            style={estiloNota}
        >
            {/* Botón X para eliminar la nota arriba a la derecha */}
            <button 
                className="btn-eliminar" 
                onClick={() => onEliminar(id)}
                title="Eliminar Nota"
            >
                x
            </button>

            <div className="nota-contenido">
                {/* Validación de Título Optativo: Solo se crea el elemento si tiene texto */}
                {titulo && titulo.trim() !== "" && (
                    <h3>{titulo}</h3>
                )}
                
                {/* Descripción Obligatoria */}
                <p className="texto-manuscrito">{descripcion}</p>
            </div>
        </div>
    );
}