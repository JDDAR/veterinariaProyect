import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../api/axioInstance";
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

  const handleNewCita = async (cliente) => {
    try {
      const response = await axiosInstance.get(
        `/api/mascotas?clienteId=${cliente}`,
      );
      const mascotas = response.data.mascotas;

      dispatch(
        openModal({
          modalContent: "REGISTER_FORM",
          modalProps: {
            cliente: cliente,
            mascotas: mascotas || [],
          },
        }),
      );
    } catch (error) {
      console.log("Error al extraer las mascotas ", error);
      alert("Nose encontraron mascotas asociadas..");
    }
  };

  return (
    <div className="containerFilterUser">
      <h4>Buscar Cliente</h4>
      <input
        type="text"
        placeholder="Buscar por número de documento"
        value={documento}
        onChange={handleSearchChange}
        className="inputSearch"
      />

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <div className="containerFilterUser__containerCards">
        {cliente.length > 0 ? (
          cliente.map((c) => (
            <div key={c.id} className="containerFilterUser__cards">
              <h5>
                {c.nameUser} {c.lastNameUser}
              </h5>
              <div className="containerFilterUser__cards__content">
                <p>
                  <strong>Estado:</strong> {c.estadoUser}
                </p>
                <p>
                  <strong>Correo:</strong> {c.email}
                </p>
                <p>
                  <strong>Documento:</strong> {c.numberDocumento}
                </p>
                <div className="containerFilterUser__cards__button">
                  <button onClick={() => handleButonPet(c.id)}>
                    Asignar Mascota
                  </button>
                  <button onClick={() => handleNewCita(c.id)}>
                    Cita nueva
                  </button>
                </div>
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
