export default FormularioNota;

function FormularioNota() {
  return (
    <form>
      <input
        type="text"
        placeholder="Título"
      />
      <input
        type="text"
        placeholder="Descripción"
      />

      <label>
        <input type="checkbox" />
        Importante
      </label>

      <button type="submit">
        AGREGAR
      </button>
    </form>
  );
}

if(descripcion.trim() === ""){
   alert("La descripción es obligatoria");
   return;
}

useEffect(() => {

  localStorage.setItem(
    "notas",
    JSON.stringify(notas)
  );

}, [notas]);

useEffect(() => {

  const notasGuardadas =
    JSON.parse(localStorage.getItem("notas")) || [];

  setNotas(notasGuardadas);

}, []);