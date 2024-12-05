import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMascotas } from "../../../redux/slices/mascotaSlice";
import { fetchHistorial } from "../../../redux/slices/historialSlice";

const FilterHistorial = () => {
  const [documento, setDocumento] = useState("");
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [errorUsuario, setErrorUsuario] = useState(""); // Para manejar errores del usuario
  const dispatch = useDispatch();

  // Estado de mascotas y historial del store
  const {
    mascotas,
    loading: loadingMascotas,
    error: errorMascotas,
  } = useSelector((state) => state.mascotas);
  const {
    historial,
    loading: loadingHistorial,
    error: errorHistorial,
  } = useSelector((state) => state.historial);

  console.log("este es el historial ", historial);

  // Actualizar la lista de mascotas al cambiar el documento
  const handleBuscarUsuario = () => {
    if (documento.trim() !== "") {
      dispatch(fetchMascotas(documento));
      setErrorUsuario(""); // Limpiar el error si se busca un documento
    } else {
      setErrorUsuario("El número de documento no puede estar vacío.");
    }
  };

  // Actualizar el historial al seleccionar una mascota
  useEffect(() => {
    if (mascotaSeleccionada) {
      dispatch(fetchHistorial(mascotaSeleccionada));
    }
  }, [mascotaSeleccionada, dispatch]);

  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
  };

  const handleMascotaChange = (e) => {
    setMascotaSeleccionada(e.target.value);
  };

  return (
    <div>
      <h4>Buscar Historial</h4>

      {/* Input y botón de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Buscar por número de documento"
          value={documento}
          onChange={handleDocumentoChange}
        />
        <button onClick={handleBuscarUsuario}>Buscar</button>
      </div>

      {/* Mostrar error si el documento es incorrecto */}
      {errorUsuario && <p style={{ color: "red" }}>{errorUsuario}</p>}

      {/* Mostrar el estado de carga o error de las mascotas */}
      {loadingMascotas && <p>Cargando mascotas...</p>}
      {errorMascotas && <p>Error al cargar mascotas: {errorMascotas}</p>}

      {/* Mostrar select de mascotas si existen */}
      {mascotas.length > 0 && (
        <div>
          <label htmlFor="mascotas">Selecciona una mascota:</label>
          <select
            id="mascotas"
            value={mascotaSeleccionada || ""}
            onChange={handleMascotaChange}
          >
            <option value="" disabled>
              -- Seleccionar --
            </option>
            {mascotas.map((mascota) => (
              <option key={mascota.idPet} value={mascota.idPet}>
                {mascota.namePet}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mostrar el estado de carga o error del historial */}
      {loadingHistorial && <p>Cargando historial...</p>}
      {errorHistorial && <p>Error al cargar historial: {errorHistorial}</p>}

      {/* Mostrar historial de la mascota seleccionada */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "20px",
        }}
      >
        {Array.isArray(historial) && historial.length > 0 ? (
          historial.map((item) => (
            <div
              key={item.idHistorial}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "300px",
              }}
            >
              <h5>Historial ID: {item.idHistorial}</h5>
              <p>{item.descripcionHistorial}</p>
              <p>
                <strong>Fecha:</strong> {item.fechaHistorial}
              </p>
            </div>
          ))
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
};

export default FilterHistorial;
