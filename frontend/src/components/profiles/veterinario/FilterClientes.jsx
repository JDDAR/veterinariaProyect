import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientes } from "../../../redux/slices/clienteSlice";
import { openModal } from "../../../redux/slices/modalSlice";

const FilterClientes = () => {
  const [documento, setDocumento] = useState("");
  const dispatch = useDispatch();
  const { cliente, loading, error } = useSelector((state) => state.clientes);

  // Cargar todos los clientes al montar el componente
  useEffect(() => {
    dispatch(fetchClientes()); // Llama a la acción sin filtro al inicio
  }, [dispatch]);

  // Actualizar la lista al cambiar el filtro
  useEffect(() => {
    if (documento.trim() !== "") {
      dispatch(fetchClientes(documento));
    }
  }, [documento, dispatch]);

  const handleSearchChange = (e) => {
    setDocumento(e.target.value);
  };

  const handleButonPet = (id) => {
    console.log("id numero", id);
    dispatch(
      openModal({
        modalContent: "ADD_PET_FORM",
        modalProps: { clientId: id },
      }),
    );
  };

  const handleNewCita = (cliente) => {
    dispatch(
      openModal({
        modalContent: "REGISTER_FORM",
        modalProps: { cliente: cliente },
      }),
    );
  };

  return (
    <div>
      <h4>Buscar Cliente</h4>
      <input
        type="text"
        placeholder="Buscar por número de documento"
        value={documento}
        onChange={handleSearchChange}
      />

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {cliente.length > 0 ? (
          cliente.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "300px",
              }}
            >
              <h5>
                {c.nameUser} {c.lastNameUser}
              </h5>
              <p>
                <strong>Estado:</strong> {c.estadoUser}
              </p>
              <p>
                <strong>Correo:</strong> {c.email}
              </p>
              <p>
                <strong>Documento:</strong> {c.numberDocumento}
              </p>
              <div>
                <button onClick={() => handleButonPet(c.id)}>
                  Asignar Mascota
                </button>
                <button onClick={() => handleNewCita(c.id, c)}>
                  Cita nueva
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay clientes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default FilterClientes;
