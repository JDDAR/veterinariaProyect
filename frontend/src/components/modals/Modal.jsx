import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import componentMap from "../../utils/componentMap";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalContent, modalProps } = useSelector(
    (state) => state.modal,
  );

  if (!isOpen) return null;

  //Mapeo Dinamico
  const ComponentRender = componentMap[modalContent];

  return (
    <>
      <div className="modalBackdrop">
        <div className="modalContent">
          <button
            className="closeModal button-primary"
            onClick={() => dispatch(closeModal())}
          >
            X
          </button>
          {ComponentRender ? (
            <ComponentRender {...modalProps} />
          ) : (
            <p>Debe registrarse primero</p>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default Modal;
