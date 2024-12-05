import HistorialPaciente from "../components/profiles/veterinario/HistorialPaciente";
import RegisterCita from "../components/profiles/veterinario/RegisterCita";
import RegisterPet from "../components/profiles/veterinario/RegisterPet";

const componentMap = {
  REGISTER_FORM: RegisterCita, // Mapeo de la cadena al componente correspondiente
  ADD_PET_FORM: RegisterPet,
  HISTORIAL_FORM: HistorialPaciente,
};

export default componentMap;
