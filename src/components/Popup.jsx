import React from "react";

import "./Popup.scss";

const Popup = (props) => {
  const data = props.content;
  return (
    <div className="popup-box">
      <div className="box">
        <div className="popup__header">
          <span>Selecionar o contato?</span>
        </div>
        <div className="popup__body">
          <span className="popup__avatar">
            <img src={data.avatar} alt={data.name} />
          </span>
          <ul>
            <li className="popup__data"><b>Nome:</b> {data.name}</li>
            <li className="popup__data"><b>Telefone:</b> {data.phone}</li>
            <li className="popup__data"><b>País:</b> {data.country}</li>
            <li className="popup__data"><b>Departamento:</b> {data.department}</li>
          </ul>
        </div>
        <div className="popup__footer">
          <button type="button" className="btn btn__save">
            Sim
          </button>
          <button
            className="btn btn__close"
            onClick={() => props.handleClose()}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
