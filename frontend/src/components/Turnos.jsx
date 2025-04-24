import React, { useEffect, useState } from "react";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(false);
  const [turnoEditado, setTurnoEditado] = useState(null);

  const [nuevoTurno, setNuevoTurno] = useState({
    name: "",
    price: "",
    hour: "",
    cancha: "",
  });

  useEffect(() => {
    if (mostrarResultados) {
      fetchTurnos();
    }
  }, [mostrarResultados]);

  const fetchTurnos = async () => {
    try {
      const res = await fetch("http://localhost:4000/turnos");
      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al obtener turnos", error);
    }
  };

  const handleChange = (e) => {
    setNuevoTurno({ ...nuevoTurno, [e.target.name]: e.target.value });
  };

  const agregarTurno = async () => {
    try {
      const res = await fetch("http://localhost:4000/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTurno),
      });
      if (res.ok) {
        fetchTurnos();
        setNuevoTurno({ name: "", price: "", hour: "", cancha: "" });
      }
    } catch (error) {
      console.error("Error al agregar turno", error);
    }
  };

  const eliminarTurno = async (id) => {
    try {
      await fetch(`http://localhost:4000/turnos/${id}`, 
        { method: "DELETE" });
      fetchTurnos();
    } catch (error) {
      console.error("Error al eliminar turno", error);
    }
  };

  const editarTurno = (turno) => {
    setEditando(true);
    setTurnoEditado(turno);
    setNuevoTurno(turno);
  };

  const actualizarTurno = async () => {
    try {
      const res = await fetch(`http://localhost:4000/turnos/${turnoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTurno),
      });
      if (res.ok) {
        fetchTurnos();
        setNuevoTurno({ name: "", price: "", hour: "", cancha: "" });
        setEditando(false);
      }
    } catch (error) {
      console.error("Error al actualizar turno", error);
    }
  };

  const turnosFiltrados = turnos.filter((turno) =>
    turno.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div>
        <h2 id="title">Gestión de turnos online</h2>
      </div>

      {/* Formulario para agregar o editar turno */}
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input-style"
          type="text"
          name="name"
          placeholder="Nombre"
          value={nuevoTurno.name}
          onChange={handleChange}
        />
        <input
          className="input-style"
          type="text"
          name="price"
          placeholder="Precio"
          value={nuevoTurno.price}
          onChange={handleChange}
        />
        <p></p>
        <input
          className="input-style"
          type="text"
          name="hour"
          placeholder="Hora"
          value={nuevoTurno.hour}
          onChange={handleChange}
        />
        <input
          className="input-style"
          type="text"
          name="cancha"
          placeholder="Cancha"
          value={nuevoTurno.cancha}
          onChange={handleChange}
        />
        <div className="btns">
          {editando ? (
            <button type="button" onClick={actualizarTurno}>
              Actualizar
            </button>
          ) : (
            <button type="button" onClick={agregarTurno}>
              Agregar
            </button>
          )}
          <button type="button" onClick={() => setMostrarResultados(!mostrarResultados)}>
            {mostrarResultados ? "Ocultar resultados" : "Mostrar resultados"}
          </button>
        </div>
      </form>

      {/* Input para buscar turnos */}
      {mostrarResultados && (
        <>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* Tabla de turnos */}
          <h3>Lista de turnos</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Hora</th>
                <th>Cancha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnosFiltrados.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.name}</td>
                  <td>{turno.price}</td>
                  <td>{turno.hour}</td>
                  <td>{turno.cancha}</td>
                  <td>
                    <button onClick={() => editarTurno(turno)}>Editar</button>
                    <button onClick={() => eliminarTurno(turno.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Turnos;
